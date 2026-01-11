import { APILogger } from '../utils/logger/apiLogger';
import { generateCurl } from '../utils/logger/generateCurl';
import { APIRequestContext, APIResponse } from '@playwright/test';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const METHOD_MAP: Record<HttpMethod, 'get' | 'post' | 'put' | 'patch' | 'delete'> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

export interface ApiClientOptions {
  timeout?: number;
  maxRetries?: number;
}

export interface RequestOptions {
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  expectedStatus?: number | number[];
  rawResponse?: boolean;
}

const DEFAULT_OPTIONS: ApiClientOptions = {
  timeout: 10000,
  maxRetries: 2
};

export class ApiClient {
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  constructor(
    private request: APIRequestContext,
    private defaultOptions: ApiClientOptions = DEFAULT_OPTIONS
  ) {}

  async makeApiRequest<T>(method: HttpMethod, url: string, options: RequestOptions = {}): Promise<T | APIResponse> {
    const fullHeaders = { ...this.defaultHeaders, ...options.headers };
    const start = Date.now();

    const curl = generateCurl(method, url, options.data, fullHeaders);

    try {
      const response = await this.request[METHOD_MAP[method]](url, {
        data: options.data,
        params: options.params,
        headers: fullHeaders,
        timeout: options.timeout ?? this.defaultOptions.timeout,
        maxRetries: this.defaultOptions.maxRetries
      });

      const durationMs = Date.now() - start;
      const status = response.status();

      // Log slow requests
      if (durationMs > 5000) {
        APILogger.warn({ url, method, durationMs }, 'SLOW_API_RESPONSE');
      }

      APILogger.info({ method, url, status, durationMs: `${durationMs}ms`, curl }, 'API_CALL');

      // Return raw response if requested
      if (options.rawResponse) {
        return response;
      }

      // Parse body safely
      let body: any;
      try {
        body = await response.json();
      } catch (e) {
        // Fallback to text if JSON parsing fails
        body = await response.text().catch(() => 'NOT_PARSABLE');
        // Only warn if we expected JSON (based on content-type or default) but got something else
        // ignoring empty bodies for 204 No Content
        if (status !== 204) {
          APILogger.warn({ status, body }, 'NON_JSON_RESPONSE');
        }
      }

      // Validate Status Code
      if (!this.isStatusExpected(status, options.expectedStatus)) {
        const errMsg = `Request failed: ${method} ${url} → ${status}\nBody: ${JSON.stringify(body, null, 2)}`;
        APILogger.error({ status, body, curl, durationMs }, errMsg);
        throw new Error(errMsg);
      }

      return body as T;
    } catch (err: any) {
      // If it hasn't been logged yet (unexpected network error etc)
      APILogger.error({ url, method, curl, error: err?.message ?? err }, 'API_REQUEST_FAILED');
      throw err;
    }
  }

  // --- Convenience Methods ---

  async get<T>(url: string, options?: Omit<RequestOptions, 'data'>): Promise<T> {
    return this.makeApiRequest<T>('GET', url, options) as Promise<T>;
  }

  async post<T>(url: string, data?: any, options?: Omit<RequestOptions, 'data'>): Promise<T> {
    return this.makeApiRequest<T>('POST', url, { ...options, data }) as Promise<T>;
  }

  async put<T>(url: string, data?: any, options?: Omit<RequestOptions, 'data'>): Promise<T> {
    return this.makeApiRequest<T>('PUT', url, { ...options, data }) as Promise<T>;
  }

  async patch<T>(url: string, data?: any, options?: Omit<RequestOptions, 'data'>): Promise<T> {
    return this.makeApiRequest<T>('PATCH', url, { ...options, data }) as Promise<T>;
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.makeApiRequest<T>('DELETE', url, options) as Promise<T>;
  }

  // --- Helper ---

  private isStatusExpected(status: number, expected?: number | number[]): boolean {
    if (expected === undefined) {
      return status >= 200 && status < 300;
    }
    if (Array.isArray(expected)) {
      return expected.includes(status);
    }
    return status === expected;
  }
}
