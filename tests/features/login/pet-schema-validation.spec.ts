import Ajv from "ajv";
import { test, expect } from "@playwright/test";
import { validateJsonSchema } from "../../../lib/helpers/jsonHelper/validateJsonSchema";
import { schemas } from "../../../src/core/api/schema/zodiosClient";

test("validate openAPI (swagger3)schema use zod", async ({ request }) => {
  const res = await request.get("https://petstore3.swagger.io/api/v3/pet/1");
  expect(res.status()).toBe(200);
  // check schema
  const resBody = await res.json();
  const validationResult = schemas.Pet.safeParse(resBody);
  expect(validationResult.success).toBe(true);
});

test.describe.skip("Schema", () => {
  test("validate simple and statis json schema", async ({ request }) => {
    const ajv = new Ajv();
    let response = await (await request.get(`v2/pet/1`)).json();

    // validate response against schema
    const valid = ajv.validate(
      require("./test-data/json/pet-schema.json"),
      response
    );
    if (!valid) {
      console.error("AJV Validation Errors:", ajv.errorsText());
    }
    expect(valid).toBe(true);
  });

  test("validate json schema based on response", async ({
    request,
    baseURL,
  }) => {
    let response = await (await request.get(`v2/pet/1`)).json();

    // compare with schema
    await validateJsonSchema("get", "pet", response, true);

    // param isCreate = false to against change.
    // need to create script to generate schema when needed
  });
});
