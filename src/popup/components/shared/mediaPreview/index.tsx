import React from "react";
import * as styles from "./styles.module.css";
import Image, { NativeImageProps } from "../image";
import Icon from "../icon";

export interface MediaPreviewProps
  extends Pick<NativeImageProps, "crossOrigin" | "src"> {
  domain?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export default function MediaPreview({
  domain = "",
  src,
  alt,
  className,
  crossOrigin,
  onClick,
}: MediaPreviewProps) {
  if (src) {
    return (
      <Image
        alt={alt}
        src={src}
        crossOrigin={crossOrigin}
        onClick={onClick}
        className={`${styles.image} ${className}`}
      />
    );
  }

  if (domain.includes("instagram")) {
    return (
      <Icon
        icon="instagram"
        onClick={onClick}
        className={`${styles.icon} ${className}`}
      />
    );
  }

  if (domain.includes("x.com")) {
    return (
      <Icon
        icon="twitterX"
        onClick={onClick}
        className={`${styles.icon} ${className}`}
      />
    );
  }

  return (
    <Icon
      icon="image"
      onClick={onClick}
      className={`${styles.icon} ${className}`}
    />
  );
}
