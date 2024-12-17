import { MessageAPI } from "@api/message";
import { CookiesGetAllParams } from "@background/cookies/validation";

export async function getAll(details: CookiesGetAllParams): Promise<Cookies> {
  if (details) {
    return browser.cookies.getAll({ ...details });
  }

  const current = await MessageAPI.findCurrentTab();

  if (current) {
    return browser.cookies.getAll({ url: new URL(current.url).origin });
  }

  return [];
}
