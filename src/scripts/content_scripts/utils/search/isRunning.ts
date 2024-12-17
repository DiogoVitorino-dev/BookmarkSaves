export const isRunning = (fromAction: string) =>
  window.__content.searching.has(fromAction);

