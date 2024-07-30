import { request } from "@playwright/test";

async function teardown(): Promise<void> {
  // close DB connection
  // reset or update test data
  const context = await request.newContext();
  // await context.delete(url);
  const res = await context.dispose();
  console.log("teardown");
}
