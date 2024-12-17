import React from "react";
import * as styles from "./styles.module.css";
import Icon from "@components/shared/icon";
import IconButton from "@components/shared/iconButton";
import MediaPreview from "@components/shared/mediaPreview";
import { MediaType } from "@content/common";
import { Gallery, Item } from "@content/typing";

interface ItemProps extends Gallery {
  domain?: string;
  className?: string;
  onClick?: (item: Gallery) => void;
  onClickCheck?: (item: Gallery) => void;
}

const MediaTypeIcon = (items: Item[]) => {
  if (items.length > 1) {
    return <Icon icon="gallery" className={styles.mediaTypeIcon} />;
  }

  switch (items[0].media.type) {
    case MediaType.Video:
      return <Icon icon="video" className={styles.mediaTypeIcon} />;
  }
};

export default function ItemList({
  items,
  source,
  domain,
  className,
  preview,
  onClick,
  onClickCheck,
}: ItemProps) {
  const handleClick = () =>
    onClick ? onClick({ items, preview, source }) : undefined;

  const handleClickCheck = () =>
    onClickCheck ? onClickCheck({ items, preview, source }) : undefined;

  const isChecked = items.some(({ download }) => download);

  return (
    <li
      className={`${styles.container} ${!isChecked ? styles.unchecked : ""} ${className}`}
    >
      <MediaPreview
        className={styles.preview}
        src={preview.extra?.dataUrl?.data || preview.url}
        domain={domain}
        onClick={handleClick}
      />

      <div className={`${styles.icon} ${styles.icon_left}`}>
        {MediaTypeIcon(items)}
      </div>

      <IconButton
        icon="checkCircleFilled"
        onClick={handleClickCheck}
        className={`${styles.icon} ${styles.icon_right} ${styles.checkedIcon}`}
      />
    </li>
  );
}
