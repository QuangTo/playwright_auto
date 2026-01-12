type HeaderOptions = {
  contentType?: string | null;
  token?: string;
  authScheme?: string;
  additionalHeaders?: Record<string, string>;
};

export function createHeaders({ contentType = 'application/json', token = '', authScheme = 'Bearer', additionalHeaders = {} }: HeaderOptions = {}): Record<
  string,
  string
> {
  const headers: Record<string, string> = {
    ...additionalHeaders
  };

  if (contentType !== null) {
    headers['Content-Type'] = contentType;
  }
  if (token) {
    const schemePrefix = authScheme ? `${authScheme} ` : '';
    const finalToken = token.toLowerCase().startsWith(authScheme.toLowerCase()) ? token : `${schemePrefix}${token}`;
    headers['Authorization'] = finalToken.trim();
  }

  return headers;
}
