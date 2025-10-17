import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);
const SERVICES_MANIFEST = './src/scripts/codegen/services.manifest.json';

const CONFIG_PATH = path.resolve(process.argv[2] ?? SERVICES_MANIFEST);
const OUTPUT_DIR = path.resolve('./src/core/api/types');

async function generateOpenApiTypes() {
  if (!fs.existsSync(CONFIG_PATH)) throw new Error(`Missing config: ${CONFIG_PATH}`);

  const { services } = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  if (!services?.length) return console.warn('⚠️  No services found.');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`🚀 Generating OpenAPI types for ${services.length} service(s)...\n`);

  for (const s of services) {
    const outFile = path.join(OUTPUT_DIR, `${s.name.toLowerCase()}-type.d.ts`);
    const cli = `npx openapi-typescript "${s.openapiUrl}" -o "${outFile}" --immutable --root-types true --export-type`;

    console.log(`🧩 [${s.serviceName}] Generating...`);
    try {
      const { stderr } = await execAsync(cli);
      if (stderr?.trim()) console.warn(`⚠️  ${s.serviceName}: ${stderr}`);
      console.log(`✅ Done → ${outFile}\n`);
    } catch (err: any) {
      console.error(`❌ ${s.serviceName}: ${err.message}`);
    }
  }

  console.log('🎉 All generation completed.');
}

generateOpenApiTypes().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
