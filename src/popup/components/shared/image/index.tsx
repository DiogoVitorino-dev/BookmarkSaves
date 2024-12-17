import React, { ComponentProps } from "react";
import * as styles from "./styles.module.css";

export type NativeImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  keyof React.HTMLAttributes<HTMLImageElement>
>;

export type ImageProps = ComponentProps<"img">

export default function Image({ className, ...props }: ImageProps) {
  return  <img {...props} className={`${styles.image} ${className}`} />;
}
