import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.css";
import Video from "@components/shared/video";
import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import Image, { ImageProps } from "@components/shared/image";

export interface PreviewProps extends ImageProps {
  preview: Media;
  fallback: Media;
}

export default function Preview({
  preview,
  fallback,
  className,
  ...props
}: PreviewProps) {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [videoError, setVideoError] = useState<boolean>(false);

  const showFallbackOnVideoError = () => setVideoError(true);

  useEffect(() => {
    if (preview.type === MediaType.Video) {
      setVideoError(false);
      const { extra, url } = preview;

      if (extra?.dataUrl?.data) {
        setVideoSrc(extra?.dataUrl?.data);
      } else {
        setVideoSrc(url);
      }
    }
  }, [preview]);

  if (preview.type === MediaType.Video && !videoError) {
    return (
      <Video
        {...props}
        className={`${styles.preview} ${className}`}
        video={{ src: videoSrc }}
        onError={showFallbackOnVideoError}
      />
    );
  }
  return (
    <Image
      {...props}
      className={`${styles.preview} ${className}`}
      src={
        videoError ? fallback.url : preview.extra?.dataUrl?.data || preview.url
      }
    />
  );
}
