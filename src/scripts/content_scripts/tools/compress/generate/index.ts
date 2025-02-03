import type {
  ToolsDataOptions,
  ToolsGenerateCompressParams,
} from "@content/tools/validation";
import { ConversionUtils } from "@utils/conversion";
import { DateUtils } from "@utils/date";
import JSZip from "jszip";

const defaultFilename = () => "BookmarkSaved_" + DateUtils.getSafeISO();

export async function generate({
  dataUrlFiles,
  blobFiles,
  urls,
  compressOptions,
}: ToolsGenerateCompressParams) {
  const content = await convertingToBase64File({
    dataUrlFiles,
    blobFiles,
    urls,
  });

  if (content.length > 0) {
    const zip = new JSZip();

    content.forEach((file) => {
      zip.file(file.name, file.data, { base64: true });
    });

    const compressed: BlobFile = {
      name: compressOptions?.filename || defaultFilename(),
      type: "zip",
      data: await zip.generateAsync({ type: "blob" }),
    };

    return compressed;
  }

  return null;
}

async function convertingToBase64File({
  dataUrlFiles = [],
  base64Files = [],
  blobFiles = [],
  urls = [],
}: ToolsDataOptions): Promise<Base64File[]> {
  return Promise.all([
    ...urls.map((url) => ConversionUtils.toBase64File.fromUrl(url)),
    ...blobFiles.map(({ data, name }) =>
      ConversionUtils.toBase64File.fromBlob(data, name)
    ),
    ...dataUrlFiles.map(({ data, name }) =>
      ConversionUtils.toBase64File.fromDataUrl(data, name)
    ),
  ]).then((result) => result.concat(base64Files));
}
