import React from "react";
import * as styles from "./styles.module.css";

type ButtonStyle = "filled" | "outlined" | "tonal" | "text";

interface ButtonProps extends React.ComponentProps<"button"> {
  buttonStyle?: ButtonStyle;
}

export default function Button({
  buttonStyle = "filled",
  className,
  title = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} ${styles[buttonStyle]} ${styles.button}`}
    >
      <span>{title}</span>
    </button>
  );
}
