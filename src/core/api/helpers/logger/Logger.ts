/**
 * need add some log table and group
 */
export class Logger {
  static logError(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  static logInfo(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  static logWarning(message: string): void {
    console.warn(`[WARNING] ${message}`);
  }

  static logCurlCommand(curlCommand: string): void {
    console.log(`[CURL COMMAND] ${curlCommand}`);
  }
}
