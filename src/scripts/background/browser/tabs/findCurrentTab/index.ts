export async function findCurrentTab(): Promise<Tab | null> {
  const tab = (
    await browser.tabs.query({ active: true, currentWindow: true })
  ).at(0);

  if (tab && tab.id && tab.url) return tab as Tab;
  return null;
}
