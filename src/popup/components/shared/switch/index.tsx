import React from "react";
import * as styles from "./styles.module.css";
import { MathUtils } from "@utils/math";

type InputProps = Omit<React.ComponentProps<"input">, "type" | "onChange">;

export interface SwitchProps extends InputProps {
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function Switch({
  onChange,
  size = 60,
  ...props
}: SwitchProps) {
  const { interpolate } = MathUtils;
  return (
    <div>
      <label
        className={styles.container}
        style={{
          transform: `scale(${interpolate(size, { min: 0, max: 60 }, { min: 0, max: 1 })})`,
        }}
      >
        <input
          {...props}
          onChange={(e) =>
            onChange ? onChange(e.target.checked, e) : undefined
          }
          type="checkbox"
        />

        <span className={`${styles.round} ${styles.slider}`} />
      </label>
    </div>
  );
}
