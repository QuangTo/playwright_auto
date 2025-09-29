import { petApi } from '@api/service';
import { mockFuzzer } from '@api/utils';
import { test, expect } from '@playwright/test';
import { petFactory } from '@api/dataFactories';

test('@api recieve 200 when send POST request', async ({ request }) => {
  test.skip(true, 'skip');
  const petData = petFactory.petBuilder();
  const response = await petApi.createPet(request, petData);
  expect(response.status()).toBe(200);
});
test('@api recieve 400 when send POST request with invalid data', async ({ request }) => {
  test.skip(true, 'skip');
  const invalidPetData = mockFuzzer.withExtrasData(petFactory.petBuilder());
  const response = await petApi.createPet(request, invalidPetData);
  expect(response.status()).toBeGreaterThanOrEqual(400);
});
