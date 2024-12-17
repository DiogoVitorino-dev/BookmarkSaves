import React, { lazy, Suspense } from "react";
import * as styles from "./styles.module.css";
import DarkMode from "./darkMode";
import TextInput from "@components/shared/input";
import { useBookmark } from "@contexts/bookmark";
import { AvailableProps } from "./available";
import Strings from "@constants/Strings";
import { useSearch } from "@contexts/search";

export type HomeProps = Pick<AvailableProps, "onClickSelection">;

const Available = lazy(() => import("./available"));
const Search = lazy(() => import("./search"));

export default function Home({ onClickSelection }: HomeProps) {
  const { source } = useBookmark();
  const { setBreakpoint, breakpoint } = useSearch();

  return (
    <div className={styles.container}>
      <Suspense>
        {source ? (
          <Available onClickSelection={onClickSelection} />
        ) : (
          <Search />
        )}
      </Suspense>

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
