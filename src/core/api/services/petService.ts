import { ApiClient } from '@api/client/apiClient';
import { APIRequestContext, APIResponse } from '@playwright/test';
import { SchemaPet } from '../types/pet-type';
import { InputWrapper } from '../types/input-wrapper';

export class PetService extends ApiClient {
  protected baseUrl: string;

  constructor(apiRequest: APIRequestContext, baseUrl: string) {
    super(apiRequest);
    this.baseUrl = baseUrl;
  }

  async createPet(data: InputWrapper<SchemaPet>, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}/pet`;
    return this.post(url, { data, headers });
  }

  async updatePet(data: InputWrapper<SchemaPet>, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}/pet`;
    return this.put(url, { data, headers });
  }

  async getPetById(petId: number, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}/pet/${petId}`;
    return this.get(url, { headers });
  }

  async deletePet(petId: number, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}/pet/${petId}`;
    return this.delete(url, { headers });
  }

  async findPetsByStatus(status: 'available' | 'pending' | 'sold', headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseUrl}/pet/findByStatus?status=${status}`;
    return this.get(url, { headers });
  }
}
