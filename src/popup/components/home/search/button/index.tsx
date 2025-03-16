import React from "react";
import * as styles from "./styles.module.css";
import Strings from "@constants/Strings";
import { cloudAnimation } from "./animation";
import { useSearch } from "@contexts/search";

const cloud1 = browser.runtime.getURL("./assets/svgs/cloud1.svg");
const cloud2 = browser.runtime.getURL("./assets/svgs/cloud2.svg");
const cloud3 = browser.runtime.getURL("./assets/svgs/cloud3.svg");
const cloud4 = browser.runtime.getURL("./assets/svgs/cloud4.svg");
const cloud5 = browser.runtime.getURL("./assets/svgs/cloud5.svg");

export type State = "unavailable" | "available" | "searching";

function buttonRef(element: HTMLButtonElement | null) {
  cloudAnimation(element?.getElementsByClassName(styles.cloud));
}

export default function SearchButton() {
  const { state, cancel, search } = useSearch();

  const handleClick = () => (state === "searching" ? cancel() : search());

  return (
    <button
      disabled={state === "unavailable"}
      onClick={handleClick}
      ref={buttonRef}
      className={`${styles.button} ${
        state === "searching" ? styles.searching : ""
      } ${state === "available" ? styles.available : ""}`}
    >
      <div
        className={`${styles.loading}`}
        style={{ opacity: state === "searching" ? 1 : 0 }}
      />

      <div className={`${styles.content}`}>
        <span className={`${styles.title}`}>
          {state === "searching" ? Strings.cancelSearch : Strings.search}
        </span>
        <div className={`${styles.sky}`}>
          <img
            className={`${styles.cloud} ${styles.cloud3}`}
            src={cloud3}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud3}`}
            src={cloud3}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud3}`}
            src={cloud3}
          ></img>

          <img
            className={`${styles.cloud} ${styles.cloud1}`}
            src={cloud1}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud1}`}
            src={cloud1}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud1}`}
            src={cloud1}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud1}`}
            src={cloud1}
          ></img>

          <img
            className={`${styles.cloud} ${styles.cloud2}`}
            src={cloud2}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud2}`}
            src={cloud2}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud2}`}
            src={cloud2}
          ></img>

          <img
            className={`${styles.cloud} ${styles.cloud4}`}
            src={cloud4}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud4}`}
            src={cloud4}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud4}`}
            src={cloud4}
          ></img>

          <img
            className={`${styles.cloud} ${styles.cloud5}`}
            src={cloud5}
          ></img>
          <img
            className={`${styles.cloud} ${styles.cloud5}`}
            src={cloud5}
          ></img>
        </div>
      </div>
    </button>
  );
}
