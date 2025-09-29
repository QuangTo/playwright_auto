import * as fs from 'fs/promises';
import { createSchema } from 'genson-js';
import { Logger } from '../logger/Logger';

// create json schema on local based on path.
export async function createJsonSchema(name: string, path: string, json: object) {
  const dirName = `tests/test-data/${path}`;
  // console.log("dirName: ", dirName);
  try {
    await fs.mkdir(dirName, { recursive: true });
    const schema = createSchema(json);
    const schemaString = JSON.stringify(schema, null, 2);
    const schemaName = `tests/test-data/${path}/${name}_schema.json`;
    await writeJsonSchema(schemaName, schemaString);
    Logger.logInfo('JSON Schema created and saved.');
  } catch (error: any) {
    Logger.logError(error);
  }
}

async function writeJsonSchema(location: string, data: string) {
  try {
    await fs.writeFile(location, data);
  } catch (error) {
    console.error(error);
  }
}
