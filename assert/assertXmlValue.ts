import { expect } from "@playwright/test";
import { Logger } from "../src/core/helper/logger/Logger";

const basePath = "";

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    if (key.includes("[") && key.includes("]")) {
      const arrayName = key.split("[")[0];
      const index = parseInt(key.split("[")[1].split("]")[0]);
      return current[arrayName][index];
    }
    return current[key];
  }, obj);
}

// Helper function for assertions
export function assertXmlValue(result: any, path: string, expectedValue: any) {
  path = `${basePath}.${path}`;
  const actualValue = getNestedValue(result, path);

  if (typeof expectedValue === "object" && expectedValue !== null) {
    expect(actualValue).toEqual(expectedValue);
  } else {
    expect(actualValue).toBe(expectedValue);
  }
}

export function assertXmlHasValue(
  result: any,
  path: string,
  expectedValue?: any
) {
  path = `${basePath}.${path}`;

  const actualValue = getNestedValue(result, path);
  expect(actualValue).toHaveValue;
}
