import { createHeaders } from './defaultHeaders';
import { Logger } from '../utils/logger/logger';
import { generateCurl } from '../utils/logger/generateCurl';
import { APIRequestContext, APIResponse } from '@playwright/test';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'QUERY';

export class ApiClient {
  protected apiRequest: APIRequestContext;
  protected headers: Record<string, string>;

  constructor(apiRequest: APIRequestContext) {
    this.apiRequest = apiRequest;
    this.headers = createHeaders();
  }

  private async makeRequest(method: HttpMethod, url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    const fullHeaders = { ...this.headers, ...options.headers };

    const curlCommand = generateCurl(method, url, options.data, fullHeaders);

    try {
      const response = await this.apiRequest.fetch(url, {
        method,
        headers: fullHeaders,
        data: options.data
      });
      Logger.logInfo(`${method} ${url} -> ${response.status()}`);
      return response;
    } catch (error) {
      Logger.logCurlCommand(`ERROR: ${error}\n ${curlCommand}`);
      throw error;
    }
  }

  async get(url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    return this.makeRequest('GET', url, options);
  }

  async post(url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    return this.makeRequest('POST', url, options);
  }

  async put(url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    return this.makeRequest('PUT', url, options);
  }

  async patch(url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    return this.makeRequest('PATCH', url, options);
  }

  async delete(url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    return this.makeRequest('DELETE', url, options);
  }

  async query(url: string, options: { headers?: Record<string, string>; data?: any } = {}): Promise<APIResponse> {
    return this.makeRequest('QUERY', url, options);
  }
}
