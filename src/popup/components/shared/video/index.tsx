import React, { ComponentProps, useEffect } from "react";
import * as styles from "./styles.module.css";

type VideoNativeProps = Omit<
  React.MediaHTMLAttributes<HTMLVideoElement>,
  keyof React.HTMLAttributes<HTMLVideoElement>
>;

export interface VideoProps extends ComponentProps<"div"> {
  video: VideoNativeProps;
}

export default function Video({
  video: { autoPlay, controls, ...videoProps },
  className,
  ...props
}: VideoProps) {  

  useEffect(() => {
    if (autoPlay) {
      document.getElementsByTagName("video")[0].play();
    }
  }, [autoPlay]);
  
  return (
    <div {...props} className={`${styles.video} ${className}`}>
      <video
        {...videoProps}
        controls={controls === undefined ? true : controls}
      />
    </div>
  );
}
