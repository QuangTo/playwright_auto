import { request } from "@playwright/test";
import { Logger } from "../helper/logger/Logger";
import type { APIResponse } from "@playwright/test";
import { generateCurlCommand } from "../helper/logger/generateCurlCommand";

async function globalSetup() {
  // given system require thoses info below for authentication
  try {
    const res: APIResponse = await (
      await request.newContext()
    ).post(process.env.AUTH_TOKEN_URL as string, {
      headers: { "Content-Type": "application/json" },
      form: {
        client_id: process.env.CLIENT_ID as string,
        scope: process.env.SCOPE as string,
        client_secret: process.env.CLIENT_SECRET as string,
      },
      timeout: 3000,
    });

    const bodyJson = await res.json();
    // get access_token and save
    process.env.AUTH_TOKEN = bodyJson.access_token;
  } catch (error) {
    console.log("Unable to authenticate: " + error);

    // return curl
    // Logger.logCurlCommand(
    //   generateCurlCommand("POST", AUTH_TOKEN_URL, dataform)
    // );
  }
}
export default globalSetup;
