import React, { ComponentProps } from "react";
import * as styles from "./styles.module.css";

/* From Uiverse.io by terenceodonoghue */

type CircularGlowProps = ComponentProps<"div">;

export default function CircularGlow({
  className,
  ...props
}: CircularGlowProps) {
  return (
    <div {...props} className={`${styles.container} ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
