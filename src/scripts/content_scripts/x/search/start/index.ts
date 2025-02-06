import { XStartSearchParams } from "@content/x/validation";

import { search } from "./search";
import { DownloadTools } from "@content/tools/download";
import { HelperAPI } from "@api/helper";

export async function start(
  breakpoint: XStartSearchParams = ""
): Promise<void> {
  window.__content__.searching = true;

  const helper = await HelperAPI("video");
  
  try {
    const medias = await search(breakpoint, helper);
    await DownloadTools.start({ blobFiles: medias, compress: true });
  } catch (error) {
    if (error instanceof Error) {
      console.log("XSearch", error.message);
    }
  } finally {
    window.__content__.searching = false;
    helper.disconnect();
  }
}
