interface BuildURLParams {
  endpoint: string;
  serverURL: string;
  params: Record<string, string | number>;
}

export function buildURL({ serverURL, endpoint, params }: BuildURLParams) {
  const url = new URL(endpoint, serverURL);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, String(value)),
  );

  return url;
}
