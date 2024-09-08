import Ajv from "ajv";
import { test, expect } from "@playwright/test";
import { validateJsonSchema } from "../../../lib/helpers/jsonHelper/validateJsonSchema";
// import { generateCurlCommand } from "../../../src/core/helper/logger/generateCurlCommand";

/**
 * parse json to schema https://json-to-schema.itential.io/
 * use ajv lib for validate
 * ref: https://json-schema.org/
 */

test.describe.fixme("Schema", () => {
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
