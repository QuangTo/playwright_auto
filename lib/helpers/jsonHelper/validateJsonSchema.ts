import Ajv from "ajv";
import { expect } from "@playwright/test";
import { createJsonSchema } from "./jsonSchemaHelper";
import { Logger } from "../logger/Logger";

// compile schema with data repsonses

export async function validateJsonSchema(
  fileName: string,
  filePath: string,
  body: object,
  isCreate = false
) {
  //   console.log("isCreate:", isCreate);
  if (isCreate) {
    await createJsonSchema(fileName, filePath, body);
  }

  const existingSchema = require(`../../../../tests/test-data/${filePath}/${fileName}_schema.json`);
  //   console.log("existingSchema: ", existingSchema);
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(existingSchema);
  const validRes = validate(body);
  if (!validRes) {
    Logger.logError(ajv.errorsText());
  }
  expect(validRes).toBe(true);
}
