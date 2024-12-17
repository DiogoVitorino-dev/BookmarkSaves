export function base64ToBlob(data: string, type = "") {
  const binary = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  return new Blob([binary], { type });
}
