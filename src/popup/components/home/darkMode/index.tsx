import React from "react";
import * as styles from "./styles.module.css";
import Switch, { SwitchProps } from "@components/shared/switch";
import Strings from "@constants/Strings";
import { useTheme } from "@contexts/theme";
import Icon from "@components/shared/icon";
import { ThemeOptions } from "@repository/theme";


type DarkModeProps = React.ComponentProps<"div">;

export default function DarkMode({ className, ...props }: DarkModeProps) {
  const { theme, switchTheme } = useTheme();

  const onChangeToggle: SwitchProps["onChange"] = (checked) =>
    switchTheme(ThemeOptions[checked ? "dark" : "light"]);

  return (
    <div {...props} className={`${styles.container} ${className}`}>
      <div className={styles.label}>
        <Icon
          icon={theme === ThemeOptions.dark ? "darkMode" : "lightMode"}
          className={styles.icon}
          size={24}
        />

        <span className={styles.title}>{Strings.DarkMode}</span>
      </div>
      <Switch
        onChange={onChangeToggle}
        checked={theme === ThemeOptions.dark}
        size={30}
      />
    </div>
  );
}
