import fs from 'fs';
import path from 'path';

const SERVICES_MANIFESTSet = './src/scripts/codegen/services.manifest.json';
const TYPES_DIR = path.resolve('./src/core/api/types');
const OUTPUT_DIR = path.resolve('./src/core/api/services');
const TYPES_IMPORT_PATH = '../types';

async function generateServices() {
  const manifestPath = path.resolve(SERVICES_MANIFESTSet);
  if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found: ${manifestPath}`);
    return;
  }

  const { services } = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  for (const service of services) {
    const typeFileName = `${service.name.toLowerCase()}-type.d.ts`;
    const typeFilePath = path.join(TYPES_DIR, typeFileName);

    if (!fs.existsSync(typeFilePath)) {
      console.warn(`Type file not found for ${service.name}: ${typeFilePath}`);
      continue;
    }

    console.log(`Parsing types for ${service.name} from ${typeFileName}...`);
    const content = fs.readFileSync(typeFilePath, 'utf-8');

    const serviceName = service.name.charAt(0).toUpperCase() + service.name.slice(1);
    const className = `${serviceName}Service`;
    const typeImportName = `${service.name.toLowerCase()}-type`;

    let code = `import { ApiClient } from '@api/client/apiClient';\n`;
    code += `import { APIRequestContext, APIResponse } from '@playwright/test';\n`;
    code += `import * as Types from '${TYPES_IMPORT_PATH}/${typeImportName}';\n`;
    code += `import { InputWrapper } from '${TYPES_IMPORT_PATH}/input-wrapper';\n\n`;

    code += `export class ${className} extends ApiClient {\n`;
    code += `  protected baseUrl: string;\n\n`;
    code += `  constructor(apiRequest: APIRequestContext, baseUrl: string) {\n`;
    code += `    super(apiRequest);\n`;
    code += `    this.baseUrl = baseUrl;\n`;
    code += `  }\n\n`;

    // Efficiently extract the paths block
    const pathsBlockMatch = content.match(/export type paths = {([\s\S]*?)\n};/);
    if (!pathsBlockMatch || !pathsBlockMatch[1]) {
      console.warn(`Could not find 'paths' type in ${typeFileName}`);
      continue;
    }
    const pathsBlock = pathsBlockMatch[1];

    // Split by route definitions to get individual route blocks
    const routeSegments = pathsBlock.split(/readonly\s+['"](\/[^'"]+)['"]:\s+{/g);
    console.log(`  Found ${Math.floor(routeSegments.length / 2)} routes`);

    for (let i = 1; i < routeSegments.length; i += 2) {
      const route = routeSegments[i];
      const routeBlock = routeSegments[i + 1];

      if (!route || !routeBlock) continue;

      // Regex to find methods within this route block
      const methodRegex = /readonly\s+(get|post|put|delete|patch):\s+operations\[['"]([^'"]+)['"]\];/g;

      let methodMatch;
      while ((methodMatch = methodRegex.exec(routeBlock)) !== null) {
        const method = methodMatch[1];
        const operationId = methodMatch[2];
        if (!method || !operationId) continue;
        console.log(`    - Found operation: ${operationId} [${method.toUpperCase()}]`);

        const methodName = operationId.charAt(0).toLowerCase() + operationId.slice(1);

        let bodyType = 'any';

        // Find all Schema types available in the file
        const schemaMatches = content.match(/export type Schema(\w+) = components\['schemas'\]\['(\w+)'\]/g);
        if (schemaMatches) {
          for (const s of schemaMatches) {
            const sNameMatch = s.match(/Schema(\w+)/);
            const sName = sNameMatch ? sNameMatch[1] : null;
            if (sName && operationId.toLowerCase().includes(sName.toLowerCase())) {
              bodyType = `Types.Schema${sName}`;
              break;
            }
          }
        }

        const pathParams = (route.match(/{([^}]+)}/g) || []).map((p) => p.replace(/[{}]/g, ''));
        const methodParams = pathParams.length > 0 ? pathParams.map((p) => `${p}: any`).join(', ') + ', ' : '';
        const urlWithParams = route.replace(/{([^}]+)}/g, '${$1}');

        code += `  /**\n`;
        code += `   * Operation: ${operationId}\n`;
        code += `   * Route: ${method.toUpperCase()} ${route}\n`;
        code += `   */\n`;

        if (['post', 'put', 'patch'].includes(method)) {
          code += `  async ${methodName}(${methodParams}data: InputWrapper<${bodyType}>, headers?: Record<string, string>): Promise<APIResponse> {\n`;
          code += `    const url = \`\${this.baseUrl}${urlWithParams}\`;\n`;
          code += `    return this.${method}(url, { data, headers });\n`;
          code += `  }\n\n`;
        } else {
          code += `  async ${methodName}(${methodParams}headers?: Record<string, string>): Promise<APIResponse> {\n`;
          code += `    const url = \`\${this.baseUrl}${urlWithParams}\`;\n`;
          code += `    return this.${method}(url, { headers });\n`;
          code += `  }\n\n`;
        }
      }
    }

    code += `}\n`;

    const outPath = path.join(OUTPUT_DIR, `${service.name.toLowerCase()}Service.ts`);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(outPath, code);
    console.log(`Generated ${className} -> ${outPath}`);
  }
}

generateServices().catch(console.error);
