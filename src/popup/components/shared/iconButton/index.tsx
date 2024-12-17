import React from "react";
import * as styles from "./styles.module.css";
import Icon, { IconNames, IconProps } from "../icon";

export interface IconButtonProps extends React.ComponentProps<"button"> {
  icon: keyof typeof IconNames;
  iconProps?: Omit<IconProps, "icon">;
}

export default function IconButton({
  icon,
  iconProps,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${className}`}>
      <Icon
        {...iconProps}
        icon={icon}
        className={`${styles.icon} ${iconProps?.className}`}
      />
    </button>
  );
}
