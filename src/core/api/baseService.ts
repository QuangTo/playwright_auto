// token in
import { createHeaders } from "./deafaultHeaders";
import { Logger } from "../../helper/logger/Logger";
import { APIRequestContext, APIResponse } from "@playwright/test";
import { generateCurlCommand } from "../../helper/logger/generateCurlCommand";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class BaseService {
  protected apiRequest: APIRequestContext;
  protected headers: Record<string, string>;

  constructor(apiRequest: APIRequestContext) {
    this.apiRequest = apiRequest;
    this.headers = createHeaders();
  }

  private async sendRequest(
    method: HttpMethod,
    url: string,
    body: { headers?: Record<string, string>; data?: Object } = {}
  ): Promise<APIResponse> {
    const fullHeaders = { ...this.headers, ...body.headers };
    const requestBody = {
      headers: fullHeaders,
      data: body.data,
    };

    const curlCommand = generateCurlCommand(
      method,
      url,
      body.data,
      fullHeaders
    );

    try {
      const response = await this.apiRequest[method.toLowerCase()](
        url,
        requestBody
      );
      Logger.logCurlCommand(
        `API RESPONSE: ${response.status()}\n}`
        // `API RESPONSE: ${response.status()}\n ${curlCommand}`
      );
      return response;
    } catch (error) {
      Logger.logCurlCommand(`ERROR: ${error}\n `);
      // Logger.logCurlCommand(`ERROR: ${error}\n ${curlCommand}`);
      throw error;
    }
  }

  async get(
    url: string,
    body: { headers?: Record<string, string>; data?: Object } = {}
  ): Promise<APIResponse> {
    return this.sendRequest("GET", url, body);
  }

  async post(
    url: string,
    body: { headers?: Record<string, string>; data?: Object }
  ): Promise<APIResponse> {
    return this.sendRequest("POST", url, body);
  }
  async put(
    url: string,
    body: { headers?: Record<string, string>; data?: Object }
  ): Promise<APIResponse> {
    return this.sendRequest("PUT", url, body);
  }

  async delete(
    url: string,
    body: { headers?: Record<string, string>; data?: Object } = {}
  ): Promise<APIResponse> {
    return this.sendRequest("DELETE", url, body);
  }

  updateToken(newToken: string): void {
    this.headers = createHeaders({ token: newToken });
  }
}
