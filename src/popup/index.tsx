import React from "react";
import { createRoot } from "react-dom/client";
import * as style from "./styles.module.css";
import "./theme/default.css";
import "./theme/text.css";
import "./theme/light.css";
import "./theme/dark.css";

import ThemeProvider, { useTheme } from "@contexts/theme";

import SearchProvider, { useSearch } from "@contexts/search";
import Loading from "@components/shared/loading";
import Home from "@components/home";

createRoot(document.getElementById("app") as HTMLElement).render(
  <SearchProvider>
    <ThemeProvider>
      <Popup />
    </ThemeProvider>
  </SearchProvider>
);

function Popup() {
  const AppTheme = useTheme();
  const search = useSearch();

  if (!AppTheme.loaded || !search.loaded) {
    return (
      <div className={`${style.container} ${AppTheme.theme}`}>
        <Loading.CircularGlow />
      </div>
    );
  }

  return (
    <div className={`${style.container} ${AppTheme.theme}`}>
      <Home />
    </div>
  );
}
