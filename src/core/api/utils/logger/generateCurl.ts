// throw curl for debbuging
export function generateCurl(method: string, url: string, data?: object, headers?: { [key: string]: string }): string {
  const jsonData = data ? JSON.stringify(data, null, 2) : '';
  const dataPart = jsonData ? `  -d '${jsonData}'` : '';
  const headerPart = headers
    ? Object.entries(headers)
        .map(([key, value]) => `  -H "${key}: ${value}"`)
        .join(' \\\n')
    : '';

  let curl = `curl -X ${method} "${url}"`;
  if (headerPart) curl += ` \\\n${headerPart}`;
  if (dataPart) curl += ` \\\n${dataPart}`;

  return curl;
}
