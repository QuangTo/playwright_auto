import { ApiClient } from '@api/client/apiClient';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthService extends ApiClient {
  protected baseUrl: string;

  constructor(apiRequest: APIRequestContext, baseUrl: string) {
    super(apiRequest);
    this.baseUrl = baseUrl;
  }

  async login(username: string, password: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/api/auth/login`;
    const bodyData = { username, password };
    return this.post(url, { data: bodyData });
  }

  // async refreshToken(refreshToken: string): Promise<APIResponse> {
  //   const url = `${this.baseUrl}/refresh-token`;
  //   return this.post(url, { data: { refreshToken } });
  // }

  // async logout(token: string): Promise<APIResponse> {
  //   const url = `${this.baseUrl}/logout`;
  //   return this.post(url, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  // }
}
