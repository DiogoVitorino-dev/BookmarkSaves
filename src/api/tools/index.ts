import { MessageAPI } from "@api/message";
import { APIUtils } from "@api/utils";
import { CompressToolsActions } from "@content/tools/compress";
import { DownloadToolsActions } from "@content/tools/download";

import {
  ToolsGenerateCompressParams,
  ToolsStartDownloadParams,
} from "@content/tools/validation";

export function ToolsAPI() {
  const { sendRequest } = MessageAPI;
  const { lazyConnect } = APIUtils;

  const connection: Port = <Port>{};

  async function download(params: ToolsStartDownloadParams) {
    if (await lazyConnect("tools", connection)) {
      await sendRequest<ToolsStartDownloadParams>(connection, {
        action: DownloadToolsActions.start,
        payload: params,
      });
    }
  }

  async function compress(params: ToolsGenerateCompressParams) {
    if (!(await lazyConnect("tools", connection))) return null;

    return (
      await sendRequest<ToolsGenerateCompressParams, BlobFile | null>(
        connection,
        {
          action: CompressToolsActions.generate,
          payload: params,
        }
      )
    ).result;
  }

  return {
    download,
    compress,
  };
}
