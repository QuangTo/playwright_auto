import Ajv from "ajv";
import { join } from "path";
import { expect } from "@playwright/test";
import { Logger } from "../logger/Logger";
import { createJsonSchema } from "./jsonSchemaHelper";

// compile schema with data repsonses
const SCHEMA_DIR = join(__dirname, "../../../../tests/test-data");
// Initialize AJV with strict mode and error details
const ajv = new Ajv({
  allErrors: true,
  strict: true,
  verbose: true,
});

export async function validateJsonSchema<T = unknown>(
  fileName: string,
  filePath: string,
  body: object,
  isCreate = false
): Promise<void> {
  if (isCreate) {
    await createJsonSchema(fileName, filePath, body);
  }

  const existingSchema = require(
    `../../../../tests/test-data/${filePath}/${fileName}_schema.json`
  );
  //   console.log("existingSchema: ", existingSchema);
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(existingSchema);
  const validRes = validate(body);
  if (!validRes) {
    Logger.logError(ajv.errorsText());
  }
  expect(validRes).toBe(true);
}
