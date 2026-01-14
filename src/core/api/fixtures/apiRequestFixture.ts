import { test as base } from '@playwright/test';
import { PetService } from '@api/services/petService';
import { AuthService } from '@api/services/authService';

type ApiFixtures = {
  petApi: PetService;
  authApi: AuthService;
};

export const test = base.extend<ApiFixtures>({
  petApi: async ({ request }, use) => {
    const baseUrl = process.env.BASE_API || 'https://petstore3.swagger.io/api/v3';
    const petService = new PetService(request, baseUrl);
    await use(petService);
  },
  authApi: async ({ request }, use) => {
    const baseUrl = process.env.AUTH_TOKEN_URL || 'https://automationintesting.online';
    const authService = new AuthService(request, baseUrl);
    await use(authService);
  }
});

export { expect } from '@playwright/test';
