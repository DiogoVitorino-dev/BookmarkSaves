import React from "react";
import Button from "@components/shared/button";
import Strings from "@constants/Strings";
import Preview from "./preview";
import * as styles from "./styles.module.css";
import { useBookmark } from "@contexts/bookmark";

export interface AvailableProps {
  onClickSelection?: () => void;
}

export default function Available({ onClickSelection }: AvailableProps) {
  const { cleanBookmark, download, downloading } = useBookmark();

  const handleClickDownload = () => download();

  const handleClickSearch = async () => cleanBookmark();

  return (
    <div className={styles.container}>
      <Preview />
      <div className={styles.containerButtons}>
        <Button
          title={Strings.DownloadButton}
          className={styles.button}
          disabled={downloading}
          onClick={handleClickDownload}
        />
        <Button
          title={Strings.SelectItemsButton}
          buttonStyle="outlined"
          className={styles.button}
          onClick={onClickSelection}
        />
        <Button
          title={Strings.search}
          buttonStyle="text"
          className={styles.button}
          onClick={handleClickSearch}
        />
      </div>
    </div>
  );
}
