import fs from 'fs';
import path from 'path';

const SERVICES_MANIFEST = './src/scripts/codegen/services.manifest.json';
const TYPES_DIR = path.resolve('./src/core/api/types');
const OUTPUT_DIR = path.resolve('./src/core/api/factories');
const TYPES_IMPORT_PATH = '../types';

async function generateFactories() {
  const manifestPath = path.resolve(SERVICES_MANIFEST);
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

    console.log(`Generating factory for ${service.name} from ${typeFileName}...`);
    const content = fs.readFileSync(typeFilePath, 'utf-8');

    const typeImportName = `${service.name.toLowerCase()}-type`;

    // Find all Schema types
    const schemaMatches = [...content.matchAll(/export type Schema(\w+) = components\['schemas'\]\['(\w+)'\]/g)];
    if (schemaMatches.length === 0) {
      console.warn(`No schemas found in ${typeFileName}`);
      continue;
    }

    let code = `import { faker } from '@faker-js/faker';\n`;
    code += `import { InputWrapper } from '${TYPES_IMPORT_PATH}/input-wrapper';\n`;
    code += `import * as Types from '${TYPES_IMPORT_PATH}/${typeImportName}';\n\n`;

    // Extract the schemas block to find property details
    // Extract the schemas block to find property details
    const schemasMatch = content.match(/schemas: \{([\s\S]*?)\n  \};/);
    let schemasBlock = schemasMatch ? schemasMatch[1] : '';
    if (!schemasBlock) {
      console.warn(`Could not find 'schemas' block in ${typeFileName}`);
      // Fallback: try matching until the end of components
      const fallbackMatch = content.match(/schemas: \{([\s\S]*)/);
      if (!fallbackMatch || !fallbackMatch[1]) continue;
      schemasBlock = fallbackMatch[1];
      console.log(`  (Using fallback for schemas block)`);
    }
    console.log(`  Schemas block length: ${schemasBlock.length}`);

    for (const match of schemaMatches) {
      const schemaName = match[1];
      if (!schemaName) continue;

      const builderName = schemaName.charAt(0).toLowerCase() + schemaName.slice(1) + 'Builder';

      console.log(`  - Generating builder: ${builderName}`);
      code += `/**\n * Builder for Schema${schemaName}\n */\n`;
      code += `export const ${builderName} = (overrides: Partial<InputWrapper<Types.Schema${schemaName}>> = {}): InputWrapper<Types.Schema${schemaName}> => {\n`;
      code += `  return {\n`;

      // Find the specific schema block: readonly Name: { ... }
      const schemaHeaderRegex = new RegExp(`readonly\\s+${schemaName}:\\s+{`);
      const headerMatch = schemasBlock.match(schemaHeaderRegex);

      if (headerMatch && headerMatch.index !== undefined) {
        const startIndex = headerMatch.index;
        const remaining = schemasBlock.substring(startIndex + headerMatch[0].length);
        // Find the closing brace of the schema block (the one indented similarly or less)
        const endIndex = remaining.indexOf('};');
        const detail = remaining.substring(0, endIndex);

        // Match properties: readonly name?: type;
        const props = [...detail.matchAll(/readonly\s+(\w+)\??:\s+([\s\S]*?);/g)];

        for (const propMatch of props) {
          const propName = propMatch[1];
          let propType = propMatch[2]?.trim();
          if (!propName || !propType) continue;

          // Clean up type (remove comments)
          propType = propType.replace(/\/\*\*[\s\S]*?\*\//g, '').trim();

          if (propName === 'id') {
            code += `    id: faker.number.int({ max: 1000000 }),\n`;
          } else if (propName === 'name') {
            code += `    name: \`${schemaName.toLowerCase()}-\${faker.string.alphanumeric(5)}\`,\n`;
          } else if (propType.includes("components['schemas']")) {
            const nestedMatch = propType.match(/components\['schemas'\]\['(\w+)'\]/);
            if (nestedMatch && nestedMatch[1]) {
              const nestedName = nestedMatch[1];
              const nestedBuilder = nestedName.charAt(0).toLowerCase() + nestedName.slice(1) + 'Builder';
              const isArray = propType.includes('[]');
              code += `    ${propName}: ${isArray ? `[${nestedBuilder}()]` : `${nestedBuilder}()`},\n`;
            }
          } else if (propType.includes('string')) {
            // Handle complex string types like 'readonly string[]'
            if (propType.includes('[]')) {
              code += `    ${propName}: [],\n`;
            } else if (propName.toLowerCase().includes('url')) {
              code += `    ${propName}: faker.internet.url(),\n`;
            } else if (propName.toLowerCase().includes('email')) {
              code += `    ${propName}: faker.internet.email(),\n`;
            } else if (propName.toLowerCase().includes('date')) {
              code += `    ${propName}: faker.date.anytime().toISOString(),\n`;
            } else {
              code += `    ${propName}: faker.lorem.word(),\n`;
            }
          } else if (propType.includes('number')) {
            code += `    ${propName}: faker.number.int({ max: 100 }),\n`;
          } else if (propType.includes('boolean')) {
            code += `    ${propName}: faker.datatype.boolean(),\n`;
          } else if (propType.includes('[]')) {
            code += `    ${propName}: [],\n`;
          } else if (propType.includes('|')) {
            const values = propType.split('|').map((v: string) => v.trim().replace(/['"]/g, ''));
            if (values.length > 0 && values[0] !== 'never') {
              code += `    ${propName}: '${values[0]}',\n`;
            }
          }
        }
      }

      code += `    ...overrides\n`;
      code += `  };\n`;
      code += `};\n\n`;
    }

    const outPath = path.join(OUTPUT_DIR, `${service.name.toLowerCase()}-factory.ts`);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(outPath, code);
    console.log(`Generated factory -> ${outPath}`);
  }
}

generateFactories().catch(console.error);
