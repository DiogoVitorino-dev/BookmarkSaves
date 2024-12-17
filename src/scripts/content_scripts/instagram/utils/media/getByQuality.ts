import { MediaQuality, MediaQualityOptions } from "@scripts/typing";
import { MathUtils } from "@utils/math";

export interface Resolution {
  width: number;
  height: number;
}

export const qualities: MediaQuality<Resolution> = {
  best: { width: Number.MAX_SAFE_INTEGER, height: Number.MAX_SAFE_INTEGER },
  "4320p": { width: 7680, height: 4320 },
  "2160p": { width: 3840, height: 2160 },
  "1440p": { width: 2560, height: 1440 },
  "1080p": { width: 1920, height: 1080 },
  "720p": { width: 1280, height: 720 },
  "480p": { width: 854, height: 480 },
  "360p": { width: 640, height: 360 },
  "240p": { width: 426, height: 240 },
  worst: { width: 0, height: 0 },
};

export function getByQuality<T extends Resolution>(
  quality: MediaQualityOptions = "best",
  ...medias: T[]
): T {
  const { closest } = MathUtils;
  const target = qualities[quality].width + qualities[quality].height;

  return medias.reduce<T>(
    (prev, curr) => {
      if (
        closest(target, prev.width + prev.height, curr.width + curr.height) ===
        curr.width + curr.height
      ) {
        prev = curr;
      }
      return prev;
    },
    {
      width: quality === "best" ? 0 : Number.MAX_SAFE_INTEGER,
      height: quality === "best" ? 0 : Number.MAX_SAFE_INTEGER,
    } as T
  );
}
