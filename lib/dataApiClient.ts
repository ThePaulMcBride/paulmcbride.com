import { trimTrailingSlash } from "lib/dataAssets";

const DATA_API_URL = process.env.DATA_API_URL || "http://localhost:8000";

export async function fetchData<T>(path: string): Promise<T> {
  const url = `${trimTrailingSlash(DATA_API_URL)}${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}
