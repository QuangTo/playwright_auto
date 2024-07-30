import fs from "fs";
import path from "path";
import { load as loadYaml } from "js-yaml";
import { parseStringPromise } from "xml2js";

export class DataHelper {
  // protected DataHelper: any;

  async loadData(fileName: string, childPath: string = "") {
    const type = path.extname(fileName).slice(1).toLowerCase();

    const fullDirName = "../../../tests/api/test-data/" + childPath;
    const filePath = path.resolve(__dirname, fullDirName, fileName);

    try {
      const fileContents = fs.readFileSync(filePath, { encoding: "utf-8" });

      switch (type) {
        case "json":
          return JSON.parse(fileContents);
        case "yaml" || "yml":
          return loadYaml(fileContents);
        case "xml":
          // return await parseStringPromise(fileContents);
          return fileContents;
        default:
          throw new Error(`Unsupported data type: ${type}`);
      }
    } catch (error) {
      console.error(
        `Error loading ${type.toUpperCase()} data from file: ${filePath}`
      );
      return null;
    }
  }

  async writeFile(location: string, data: string) {
    try {
      fs.writeFileSync(location, data);
    } catch (error) {
      console.error(error);
    }
  }
}
