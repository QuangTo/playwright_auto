type HeaderOptions = {
  contentType?: string;
  token?: string;
  additionalHeaders?: Record<string, string>;
};

export function createHeaders({
  contentType = "application/json",
  token = "",
  additionalHeaders = {},
}: HeaderOptions = {}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    ...additionalHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// // Basic usage (equivalent to the original function)
// const headers1 = createHeaders({ token: "your-token-here" });

// // Without a token
// const headers2 = createHeaders();

// // With a different content type
// const headers3 = createHeaders({ contentType: "application/xml", token: "your-token" });

// // With additional custom headers
// const headers4 = createHeaders({
//   token: "your-token",
//   additionalHeaders: { "X-Custom-Header": "custom-value" }
// });
