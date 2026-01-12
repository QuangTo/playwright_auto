import { ApiClient } from '@api/client/apiClient';
import { APIRequestContext, APIResponse } from '@playwright/test';
import * as Types from '../types/pet-type';
import { InputWrapper } from '../types/input-wrapper';

export class PetService extends ApiClient {
  protected baseUrl: string;

  constructor(apiRequest: APIRequestContext, baseUrl: string) {
    super(apiRequest);
    this.baseUrl = baseUrl;
  }

  /**
   * Operation: addPet
   * Route: POST /pet
   */
  async addPet(data: InputWrapper<Types.SchemaPet>, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}/pet`;
    return this.post(url, { data, headers });
  }
}
