import { BrowserValidation } from "@background/browser/validation";
import { MediaQualityOptions } from "@scripts/typing";
import { array, InferType, lazy, mixed, object, string } from "yup";

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
  options: BrowserValidation.getAllCookies,
});

export type HelperVideoDownload = InferType<typeof video>;
const video = object({
  url: string().url().trim().required(),
  quality: mixed<MediaQualityOptions>().optional(),
  title: string().optional(),
});

export type HelperVideoDownloadParams = InferType<typeof videoDownload>;
const videoDownload = object({
  items: lazy((val) =>
    Array.isArray(val) ? array().of(video).required() : video.required()
  ),
  cookie: lazy((val) =>
    typeof val === "string" ? string() : cookies
  ),
});

export const HelperValidation = {
  videoDownload,
  setVideoCookies,
};
