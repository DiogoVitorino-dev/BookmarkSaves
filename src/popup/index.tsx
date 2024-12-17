import React, { lazy, useState, Suspense } from "react";
import { createRoot } from "react-dom/client";
import * as style from "./styles.module.css";
import "./theme/default.css";
import "./theme/text.css";
import "./theme/light.css";
import "./theme/dark.css";
import BookmarkProvider, { useBookmark } from "@contexts/bookmark";
import ThemeProvider, { useTheme } from "@contexts/theme";

import SearchProvider, { useSearch } from "@contexts/search";
import Loading from "@components/shared/loading";

createRoot(document.getElementById("app") as HTMLElement).render(
  <BookmarkProvider>
    <SearchProvider>
      <ThemeProvider>
        <Popup />
      </ThemeProvider>
    </SearchProvider>
  </BookmarkProvider>
);

const Selection = lazy(() => import("@components/selection"));
const Home = lazy(() => import("@components/home"));

function Popup() {
  const [selectionVisible, setSelectionVisible] = useState(false);

  const AppTheme = useTheme();
  const bookmark = useBookmark();
  const search = useSearch();

  const showSelection = () => setSelectionVisible(true);
  const hideSelection = () => setSelectionVisible(false);

  if (!AppTheme.loaded || !search.loaded || !bookmark.loaded) {
    return (
      <div className={`${style.container} ${AppTheme.theme}`}>
        <Loading.CircularGlow />
      </div>
    );
  }

  return (
    <div className={`${style.container} ${AppTheme.theme}`}>
      <Suspense fallback={<Loading.CircularGlow />}>
        {selectionVisible ? (
          <Selection onBack={hideSelection} />
        ) : (
          <Home onClickSelection={showSelection} />
        )}
      </Suspense>
    </div>
  );
}
