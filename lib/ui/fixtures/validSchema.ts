import { ZodTypeAny } from 'zod';
export { test } from '@playwright/test';
import { APIResponse, expect as baseExpect } from '@playwright/test';

export const expect = baseExpect.extend({
  async toMatchSchema(received: APIResponse, schema: ZodTypeAny) {
    const response = await received.json();
    const result = await schema.safeParseAsync(response);
    if (result.success) {
      return {
        message: () => 'schema matched',
        pass: true
      };
    } else {
      return {
        message: () =>
          'Result does not match schema: ' +
          result.error.issues.map((issue) => issue.message).join('\n') +
          '\n' +
          'Details: ' +
          JSON.stringify(result.error, null, 2),
        pass: false
      };
    }
  }
});
