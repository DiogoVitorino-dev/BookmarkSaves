import React, { useCallback, useRef } from "react";
import * as styles from "./styles.module.css";
import Strings from "@constants/Strings";
import { useSearch } from "@contexts/search";

const cloud1 = browser.runtime.getURL("./svgs/cloud1.svg");
const cloud2 = browser.runtime.getURL("./svgs/cloud2.svg");
const cloud3 = browser.runtime.getURL("./svgs/cloud3.svg");
const cloud4 = browser.runtime.getURL("./svgs/cloud4.svg");
const cloud5 = browser.runtime.getURL("./svgs/cloud5.svg");

export default function SearchButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { searching, available, cancel, search } = useSearch();

  const handleSearch = useCallback(
    () => (searching ? cancel() : search()),
    [search, cancel, searching]
  );

  const handleClick = useCallback(async () => {
    await handleSearch();
    const button = buttonRef.current?.getElementsByClassName("button").item(0);
    const title = buttonRef.current?.getElementsByClassName("title").item(0);

    if (!button || !title) return;

    const onTransitionEnd = (event: Event) => {
      if ("propertyName" in event && event.propertyName === "letter-spacing") {
        title.textContent = Strings.cancelSearch;
        title.removeEventListener("transitionend", onTransitionEnd);
      }
    };

    if (button.classList.toggle("idle")) {
      title.textContent = Strings.search;
    } else {
      title.addEventListener("transitionend", onTransitionEnd);
    }
  }, [handleSearch]);

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${styles.idle}`}
      onClick={handleClick}
      disabled={!available}
    >
      <div className={`${styles.sky}`}>
        <span className={`${styles.title}`}>{Strings.search}</span>
        <object
          className={`${styles.cloud} ${styles.cloud3}`}
          data={cloud3}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud3}`}
          data={cloud3}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud3}`}
          data={cloud3}
        ></object>

        <object
          className={`${styles.cloud} ${styles.cloud1}`}
          data={cloud1}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud1}`}
          data={cloud1}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud1}`}
          data={cloud1}
        ></object>

        <object
          className={`${styles.cloud} ${styles.cloud2}`}
          data={cloud2}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud2}`}
          data={cloud2}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud2}`}
          data={cloud2}
        ></object>

        <object
          className={`${styles.cloud} ${styles.cloud4}`}
          data={cloud4}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud4}`}
          data={cloud4}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud4}`}
          data={cloud4}
        ></object>

        <object
          className={`${styles.cloud} ${styles.cloud5}`}
          data={cloud5}
        ></object>
        <object
          className={`${styles.cloud} ${styles.cloud5}`}
          data={cloud5}
        ></object>
      </div>
    </button>
  );
}
