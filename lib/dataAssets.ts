const DATA_API_URL = process.env.DATA_API_URL || "http://localhost:8000";
const PUBLIC_DATA_API_URL =
  process.env.NEXT_PUBLIC_DATA_API_URL || DATA_API_URL;

export function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

export function dataAssetUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;

  return `${trimTrailingSlash(PUBLIC_DATA_API_URL)}${path.startsWith("/") ? "" : "/"}${path}`;
}
