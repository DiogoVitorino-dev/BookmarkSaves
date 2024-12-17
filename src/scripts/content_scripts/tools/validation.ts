import {
  array,
  boolean,
  InferType,
  mixed,
  object,
  ObjectSchema,
  string,
} from "yup";

const blobFile: ObjectSchema<BlobFile> = object({
  name: string().required(),
  data: mixed<Blob>()
    .required()
    .test(
      "is a data",
      "is not a valid data",
      (value) => value.size > 0 && value.type.length > 0
    ),
});

const dataUrlFile: ObjectSchema<DataUrlFile> = object({
  name: string().required(),
  data: string().required(),
});

const base64File: ObjectSchema<Base64File> = object({
  name: string().required(),
  data: string().required(),
});

const compressOptions = object({
  compressOptions: object({
    filename: string().optional(),
  }).optional(),
});

export type ToolsDataOptions = InferType<typeof dataOptions>;
const dataOptions = object({
  urls: array().of(string().required()),
  dataUrlFiles: array().of(dataUrlFile.required()),
  base64Files: array().of(base64File.required()),
  blobFiles: array().of(blobFile.required()),
});

export type ToolsStartDownloadParams = InferType<typeof startDownload>;
const startDownload = object({
  compress: boolean().optional(),
})
  .concat(compressOptions)
  .concat(dataOptions);

export type ToolsGenerateCompressParams = InferType<typeof generateCompress>;
const generateCompress = dataOptions.concat(compressOptions);

export const ToolsValidation = {
  startDownload,
  generateCompress,
};
