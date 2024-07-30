export function generateCurlCommand(
  method: string,
  url: string,
  data?: object,
  headers?: { [key: string]: string }
): string {
  const jsonData = data ? JSON.stringify(data) : "";
  const dataPart = jsonData ? `-d '${jsonData}'` : "";
  const headerPart = headers
    ? Object.entries(headers)
        .map(([key, value]) => `-H "${key}: ${value}"`)
        .join(" ")
    : "";
  return `curl -X ${method} "${url}" -H "Content-Type: application/json" ${headerPart} ${dataPart}`.trim();
}
