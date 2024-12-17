import type { MediaType } from "./common";

export interface Bookmark {
  // (Bookmark -> Gallery -> Item[] -> Media -> URL
  name: string;
  domain: string;

  preview: Media;
  gallery: Gallery[];
  source: string;
}

export interface Gallery {
  // Carrousel
  preview: Media;
  source: string;
  items: Item[];
}

export interface Item {
  // Post object
  preview: Media;
  media: Media;
  source: string;
  download: boolean;
}
// -------------------------------
export interface Media {
  // Image/Video
  width: number;
  height: number;
  url: string;
  type: MediaType;
  extra?: MediaExtra;
}

export interface MediaExtra {
  dataUrl?: DataUrlFile;
}
