import React, { ComponentProps } from "react";
import * as styles from "./styles.module.css";
import IconButton from "@components/shared/iconButton";
import { Item } from "@content/typing";
import { useBookmark } from "@contexts/bookmark";
import { ToolsAPI } from "@api/tools";

interface OptionsProps extends ComponentProps<"div"> {
  item: Item;
  disabled?: boolean;
}

export default function Options({
  item,
  disabled,
  className,
  ...props
}: OptionsProps) {
  const { toggleItemSelection } = useBookmark();

  const handleClickCheck = () => toggleItemSelection(item.source);

  const handleClickDownload = async () => {
    ToolsAPI().download({ urls: [item.media.url] });
  };

  const handleClickOpenLink = () => browser.tabs.create({ url: item.source });

  const handleClickMaximize = () =>
    browser.tabs.create({ url: item.media.url });

  return (
    <div {...props} className={`${styles.container} ${className}`}>
      <IconButton
        className={`${styles.button}`}
        icon="externalLink"
        onClick={handleClickOpenLink}
        disabled={disabled}
      />
      <IconButton
        className={`${styles.button}`}
        icon={item.download ? "checkCircleFilled" : "checkCircle"}
        onClick={handleClickCheck}
        disabled={disabled}
      />
      <IconButton
        className={`${styles.button}`}
        onClick={handleClickMaximize}
        disabled={disabled}
        icon="maximize"
      />
      <IconButton
        className={`${styles.button}`}
        icon="download"
        onClick={handleClickDownload}
        disabled={disabled}
      />
    </div>
  );
}
