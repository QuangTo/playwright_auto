import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseService } from './baseService';
import { createHeaders } from './deafaultHeaders';

export class AuthService extends BaseService {
  protected baseUrl: string;

  constructor(apiRequest: APIRequestContext, baseUrl: string) {
    super(apiRequest);
    this.baseUrl = baseUrl;
  }

  private getHeaders(): Record<string, string> {
    return createHeaders();
  }
  async login(username: string, password: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/api/auth/login`;
    const bodyData = { username, password };
    return this.post(url, { data: bodyData });
  }

  //   async refreshToken(refreshToken: string): Promise<any> {
  //     const url = `${this.baseUrl}/refresh-token`;
  //     const bodyData = { refreshToken };
  //     const headers = { "Content-Type": "application/json" };

  //     return this.post(url, headers, bodyData);
  //   }

  //   async logout(token: string): Promise<any> {
  //     const url = `${this.baseUrl}/logout`;
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };

  //     return this.post(url, headers, {});
  //   }
}
