import { Tab } from "./typing";

export const findCurrentTab = async (): Promise<Tab | null> => {
  const tab = (
    await browser.tabs.query({ currentWindow: true, active: true })
  ).at(0);

  if (tab && tab.id !== undefined && tab.url) return tab as Tab;

  return null;
};
