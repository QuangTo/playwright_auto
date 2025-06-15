import Ajv, { JSONSchemaType } from 'ajv';
import { test } from '@playwright/test';

const ajv = new Ajv();

// Define JsonSchema Type
interface ValidateSchemaProps<T> {
  inputSchema: JSONSchemaType<T>;
  jsonBody: T | T[];
}

export const validateJsonSchema = async <T>({ inputSchema, jsonBody }: ValidateSchemaProps<T>) => {
  await test.step('Validating JSON schema', async () => {
    const validate = ajv.compile(inputSchema);
    if (!validate(jsonBody)) {
      const prettyJson = JSON.stringify(jsonBody, null, 2);
      const prettyError = JSON.stringify(validate.errors, null, 2);
      throw new Error(`Schema validation error: ${prettyError}\nJSON: ${prettyJson}`);
    }
  });
};
