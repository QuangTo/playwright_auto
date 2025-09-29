import type { OpenAPIV3 } from 'openapi-types';

export async function fetchOpenApiInfo(url: string): Promise<{ openapi: string; version: string }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI JSON. Status: ${response.status}`);
    }

    const openApiDoc = await response.json();

    // const openapi = (openApiDoc as OpenAPIV3.Document).openapi;
    const openapi = openApiDoc?.openapi;
    const version = openApiDoc?.info?.version;

    if (!openapi || !version) {
      throw new Error("Missing 'openapi' or 'info.version' in the document.");
    }

    return { openapi, version };
  } catch (error) {
    console.error('Error fetching or parsing OpenAPI JSON:', error);
    throw error;
  }
}
