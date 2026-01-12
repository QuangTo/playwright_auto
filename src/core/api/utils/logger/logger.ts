import { TestInfo } from '@playwright/test';
import winston from 'winston';
import path from 'path';

const logFormat = winston.format.printf(({ timestamp, level, message, ...metadata }) => {
  let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` | Metadata: ${JSON.stringify(metadata)}`;
  }
  return msg;
});

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs/error.log'),
      level: 'error'
    })
    // new winston.transports.File({
    //   filename: path.join(process.cwd(), 'logs/combined.log')
    // }),
  ]
});

export class APILogger {
  static info(message: string, metadata?: any) {
    winstonLogger.info(message, metadata);
  }

  static error(message: string, metadata?: any) {
    winstonLogger.error(message, metadata);
  }

  static logError(error: any, options: { method: string; url: string; curl: string }): Error {
    const { method, url, curl } = options;
    const logTitle = `[NETWORK/SYSTEM ERROR] ${method} ${url}`;
    const logMessage = `${logTitle} -> ${error.message}`;

    this.error(logMessage, { curl, stack: error.stack });

    // Return a beautified error for the terminal/Playwright report
    return new Error(`${logTitle}\n` + `Error Detail: ${error.message}\n` + `CURL: ${curl}`);
  }

  static async logApiResponse(response: any, request: { method: string; url: string; curl: string; testInfo?: TestInfo }): Promise<void> {
    const { method, url, curl, testInfo } = request;
    const status = response.status();
    const bodyText = await response.text().catch(() => 'No body');
    const logMessage = `${method} ${url} -> ${status}`;

    // 1. Winston File Logging
    if (status >= 400) {
      this.error(logMessage, { curl, body: bodyText });
    } else {
      this.info(logMessage);
    }

    // 2. Playwright Report Attachments
    const info = this.getTestInfo(testInfo);
    if (info) {
      await this.attachRequest(info, method, url, curl);
      await this.attachResponse(info, status, bodyText);
    }
  }

  private static getTestInfo(testInfo?: TestInfo): TestInfo | undefined {
    if (testInfo) return testInfo;
    try {
      // @ts-ignore
      const { test } = require('@playwright/test');
      return test.info();
    } catch {
      return undefined;
    }
  }

  private static async attachRequest(info: TestInfo, method: string, url: string, curl: string) {
    await info.attach(`[Request] ${method} ${url}`, {
      body: curl,
      contentType: 'text/plain'
    });
  }

  private static async attachResponse(info: TestInfo, status: number, bodyText: string) {
    const isJson = this.isJsonResponse(bodyText);
    await info.attach(`[Response] ${status} Body`, {
      body: isJson ? JSON.stringify(JSON.parse(bodyText), null, 2) : bodyText,
      contentType: isJson ? 'application/json' : 'text/plain'
    });
  }

  private static isJsonResponse(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }
}
