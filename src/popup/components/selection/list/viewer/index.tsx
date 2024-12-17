import React, { useState } from "react";
import * as styles from "./styles.module.css";
import Preview from "./preview";
import Options from "./option";
import IconButton from "@components/shared/iconButton";
import { MediaType } from "@content/common";
import { Gallery } from "@content/typing";

export interface ViewerProps {
  visible: boolean;
  onRequestClose?: () => void;
  item?: Gallery;
}

export default function Viewer({ item, onRequestClose, visible }: ViewerProps) {
  const [index, setIndex] = useState(0);
  const [hideUI, setHideUI] = useState(false);

  if (!visible || !item) {
    return null;
  }

  const limit = item.items.length - 1 > index;
  const showNext = item.items.length > 1 && limit && !hideUI;
  const showPrevious = index > 0 && !hideUI;

  const prev = () => setIndex(index > 0 ? index - 1 : index);

  const next = () => setIndex(limit ? index + 1 : index);

  const toggleUI = () => setHideUI((prev) => !prev);

  const handleClickContainer: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ("id" in e.target && e.target.id === "container") {
      toggleUI();
    }
    e.preventDefault();
    e.stopPropagation();
    return null;
  };

  const handleClickPreview = () => {
    if (item.items[index].preview.type === MediaType.Image) toggleUI();
  };

  return (
    <div
      id="container"
      className={styles.container}
      onClick={handleClickContainer}
    >
      <Preview
        onClick={handleClickPreview}
        preview={item.items[index].preview}
        fallback={item.preview}
      />

      <IconButton
        icon="close"
        disabled={hideUI}
        onClick={onRequestClose}
        className={`${styles.close} ${hideUI ? styles.hide : ""}`}
      />

      <Options
        disabled={hideUI}
        item={item.items[index]}
        className={`${styles.options} ${hideUI ? styles.hide : ""}`}
      />

      <IconButton
        className={`${styles.controls} ${styles.controls_left} ${
          showPrevious ? "" : styles.hide
        }`}
        disabled={!showPrevious}
        icon="previous"
        onClick={prev}
      />

      <IconButton
        className={`${styles.controls} ${styles.controls_right} ${
          showNext ? "" : styles.hide
        }`}
        icon="next"
        disabled={!showNext}
        onClick={next}
      />
    </div>
  );
}
