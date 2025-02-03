import type { MediaType } from "./common";

export interface Media<File = BlobFile> {
  url: string;
  width: number;
  height: number;
  type: MediaType;
  file: File;
}
