import React from "react";
import * as styles from "./styles.module.css";
import DarkMode from "./darkMode";
import TextInput from "@components/shared/input";
import Strings from "@constants/Strings";
import { useSearch } from "@contexts/search";
import Search from "./search";

export default function Home() {
  const { setBreakpoint, breakpoint } = useSearch();

  return (
    <div className={styles.container}>
      <Search />

      <TextInput
        title={Strings.breakpointTitle}
        value={breakpoint}
        description={Strings.breakpointDescription}
        placeholder={Strings.breakpointPlaceholder}
        onChangeText={setBreakpoint}
      />
      <DarkMode />
    </div>
  );
}
