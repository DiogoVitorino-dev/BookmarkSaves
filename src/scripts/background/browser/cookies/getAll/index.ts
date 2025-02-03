import { findCurrentTab } from "@background/browser/tabs/findCurrentTab";
import { BrowserGetAllCookiesParams } from "@background/browser/validation";

export async function getAll(
  details: BrowserGetAllCookiesParams
): Promise<Cookies | string> {
  if (details) return browser.cookies.getAll({ ...details });

  const current = await findCurrentTab();

  if (current) {
    return browser.cookies.getAll({ url: new URL(current.url).origin });
  }

  return [];
}
