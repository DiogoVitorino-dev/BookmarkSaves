import React, { ComponentProps } from "react";
import * as styles from "./styles.module.css";

/* From Uiverse.io by Li-Deheng */

type PulsatingDotsProps = ComponentProps<"div">;

export default function PulsatingDots({ className, ...props }: PulsatingDotsProps) {
  return (
    <div {...props} className={`${className} ${styles.loader}`}>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
      <div className={styles.circle}>
        <div className={styles.dot}></div>
        <div className={styles.outline}></div>
      </div>
    </div>
  );
}
