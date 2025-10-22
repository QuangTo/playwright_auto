import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

export function loadEnvironment() {
  const env = process.env.NODE_ENV || 'dev';
  const envPath = resolve(`.env.${env}`);

  if (fs.existsSync(envPath)) {
    config({ path: envPath });
    console.log(`✅ Loaded .env.${env}`);
  } else {
    console.warn(`⚠️  Missing .env.${env}`);
  }
}
