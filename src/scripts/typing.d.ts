export interface MediaQuality<T = undefined> {
  best: T;
  "4320p": T;
  "2160p": T;
  "1440p": T;
  "1080p": T;
  "720p": T;
  "480p": T;
  "360p": T;
  "240p": T;
  worst: T;
}

export type MediaQualityOptions = keyof MediaQuality
