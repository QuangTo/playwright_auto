import { request } from '@playwright/test';

async function healthCheck(): Promise<boolean> {
  const HEALTHCHECK_URL = `${process.env.BASE_URL}/healthCheck`;
  const context = await request.newContext();

  try {
    const res = await context.get(HEALTHCHECK_URL);
    if (res.status() === 200) {
      const data = await res.json();
      return data.status === 'ok';
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Health check failed: ${error}`);
    return false;
  }
}

async function notifySlac(message: string): Promise<any> {
  const webhook = '';
  //
}
