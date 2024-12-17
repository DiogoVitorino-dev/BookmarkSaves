import React, { lazy, Suspense, useCallback, useMemo, useState } from "react";
import * as styles from "./styles.module.css";
import ItemList from "./item";

import { Gallery } from "@content/typing";
import { useBookmark } from "@contexts/bookmark";
import Loading from "@components/shared/loading";

const Viewer = lazy(() => import("./viewer"));

export default function List() {
  const [selectedGallery, setSelectedGallery] = useState<string>();
  const { gallery, domain, toggleGallerySelection } = useBookmark();

  const handleClickItem = (item: Gallery) => setSelectedGallery(item.source);

  const handleClickCheckItem = (gallery: Gallery) =>
    toggleGallerySelection(gallery.source);

  const handleCloseViewer = () => setSelectedGallery(undefined);

  const findSelectedGallery = useCallback(() => {
    if (selectedGallery) {
      return gallery.find((gallery) => gallery.source === selectedGallery);
    }
  }, [selectedGallery, gallery]);

  const items = useMemo(
    () =>
      gallery.map((item, index) => (
        <ItemList
          {...item}
          onClick={handleClickItem}
          onClickCheck={handleClickCheckItem}
          domain={domain}
          key={index}
        />
      )),
    [gallery]
  );

  return (
    <div>
      <ul className={styles.column_2}>{items}</ul>;
      {selectedGallery ? (
        <Suspense fallback={<Loading.PulsatingDots />}>
          <Viewer
            visible={Boolean(selectedGallery)}
            onRequestClose={handleCloseViewer}
            item={findSelectedGallery()}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
