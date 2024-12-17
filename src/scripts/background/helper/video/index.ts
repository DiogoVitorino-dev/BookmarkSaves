import { setCookies } from "./cookies";
import { download } from "./download";

export enum VideoHelperActions {
  setCookies = "helper/video/setCookies",
  download = "helper/video/download",
}

export const VideoHelper = {
  download,
  setCookies,
};
