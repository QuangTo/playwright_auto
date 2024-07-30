import pet from "../../test-data/json/pet.json";
import { test, expect } from "@playwright/test";

test.describe("JsonData ", () => {
  test("create new pet data", async ({ request }) => {
    //import json data input for test
    const res = await request.post(`v2/pet`, { data: pet });
    expect(res.ok()).toBeTruthy();
    expect(res.status() === 200);
  });

  test("should get data by id", async ({ request }) => {
    const res = await request.get(`v2/pet/1`);
    expect(res.ok()).toBeTruthy();
    expect(res.status() === 200);
    // compare with json data output
    expect(await res.json()).toEqual(expect.objectContaining(pet));
  });
});
