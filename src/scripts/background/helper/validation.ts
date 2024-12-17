import { CookiesValidation } from "@background/cookies/validation";
import { MediaQualityOptions } from "@scripts/typing";
import { InferType, mixed, object, string } from "yup";

const cookies = mixed<Cookies>().test({
  name: "CookieTest",
  message: "Cookie don't have value or name",
  test: (item = []) => {
    if (item.length > 0)
      return item.some((value) => value.name && value.value !== undefined);

    return true;
  },
});

export type HelperVideoSetCookiesParams = InferType<typeof setVideoCookies>;
const setVideoCookies = object({
  url: string().required(),
  options: CookiesValidation.getAll,
});

export type HelperVideoDownloadParams = InferType<typeof videoDownload>;
const videoDownload = object({
  url: string().url().trim().required(),
  quality: mixed<MediaQualityOptions>().optional(),
  title: string().optional(),
  cookies: cookies.optional(),
});

export const HelperValidation = {
  videoDownload,
  setVideoCookies,
};
