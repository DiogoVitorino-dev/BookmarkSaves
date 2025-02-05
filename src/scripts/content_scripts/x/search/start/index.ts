import { XStartSearchParams } from "@content/x/validation";

import { search } from "./search";
import { DownloadTools } from "@content/tools/download";

export async function start(
  breakpoint: XStartSearchParams = ""
): Promise<void> {
  try {
    window.__content__.searching = true;

    const medias = await search(breakpoint);

    await DownloadTools.start({ blobFiles: medias, compress: true });
  } catch (error) {
    if (error instanceof Error) {
      console.log("XSearch", error.message);
    }
  } finally {
    window.__content__.searching = false;
  }
}
