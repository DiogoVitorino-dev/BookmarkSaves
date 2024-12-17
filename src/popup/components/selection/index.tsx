import React from "react";
import Header, { HeaderProps } from "./header";
import List from "./list";
import * as styles from "./styles.module.css";

export type SelectionProps = Pick<HeaderProps, "onBack">;

export default function Selection({ onBack }: SelectionProps) {
  return (
    <div className={styles.container}>
      <Header onBack={onBack} />
      <List />
    </div>
  );
}
