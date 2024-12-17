import React from "react";
import Video from "@components/shared/video";
import * as styles from "./styles.module.css";
import SearchButton from "./button";

const particles = browser.runtime.getURL("./videos/stars.webm");

export default function Search() {
  return (
    <div className={styles.container}>
      <Video
        className={styles.video}
        video={{
          src: particles,
          loop: true,
          autoPlay: true,
          controls: false,
          muted: true,
        }}
      />
      <SearchButton />
    </div>
  );
}
