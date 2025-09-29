import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

export function parseYamlFile(yamlFilePath: fs.PathOrFileDescriptor) {
  try {
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
    return yaml.load(yamlContent);
  } catch (e) {
    console.error(`Error reading or parsing YAML file: ${yamlFilePath}`, e.message);
    throw e;
  }
}
