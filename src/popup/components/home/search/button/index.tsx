import React from "react";
import * as styles from "./styles.module.css";
import Icon from "@components/shared/icon";
import Strings from "@constants/Strings";
import { useSearch } from "@contexts/search";

export default function SearchButton() {
  const { searching, available, cancel, search } = useSearch();

  const handleClick = () => (searching ? cancel() : search());

  return (
    <button
      className={`${styles.button} ${!available ? "" : searching ? styles.cancel : styles.available}`}
      disabled={!available}
      onClick={handleClick}
    >
      <Icon
        icon={searching ? "close" : "search"}
        className={styles.icon}
        size={28}
      />
      <span className={styles.title}>
        {searching ? Strings.cancelSearch : Strings.search}
      </span>
      <div
        className={`${styles.border} ${searching ? styles.show : styles.hide}`}
      />
    </button>
  );
}
