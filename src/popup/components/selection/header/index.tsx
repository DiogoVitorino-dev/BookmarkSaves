import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.css";
import IconButton from "@components/shared/iconButton";
import Strings from "@constants/Strings";
import { useBookmark } from "@contexts/bookmark";

export interface HeaderProps {
  onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  const [title, setTitle] = useState("");
  const { gallery, selectedGalleries } = useBookmark();

  const selectionFeedback = () => {
    if (selectedGalleries.length === 0) {
      setTitle(Strings.emptySelection);
    } else {
      setTitle((prev) => {
        prev = Strings.selectedItems_;
        prev = prev.replace("_", selectedGalleries.length.toString());
        prev = prev.replace("_", gallery.length.toString());
        return prev
      });
    }
  };

  useEffect(() => {
    selectionFeedback();
  }, [selectedGalleries]);

  return (
    <div className={styles.container}>
      <IconButton className={styles.icon} icon="back" onClick={onBack} />
      <div className={styles.containerTitle}>
        <span className={styles.title}>{title}</span>
      </div>
      <IconButton className={styles.icon} icon="options" onClick={onBack} />
    </div>
  );
}
