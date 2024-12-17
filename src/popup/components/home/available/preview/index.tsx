import React from "react";
import * as styles from "./styles.module.css";
import MediaPreview from "@components/shared/mediaPreview";
import { useBookmark } from "@contexts/bookmark";

type PreviewProps = React.ComponentProps<"div">;

export default function Preview({ className, ...props }: PreviewProps) {
  const { name, domain, preview } = useBookmark();
  return (
    <div {...props} className={`${styles.container} ${className}`}>
      <MediaPreview
        src={preview.extra?.dataUrl?.data || preview.url}
        domain={domain}
      />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
