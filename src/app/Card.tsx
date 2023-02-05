import { ReactNode } from "react";

import styles from "./Card.module.css";
export type CardState = "unused" | "using" | "used";
export default function Card({
  frontFace,
  backFace,
  state,
  onClick,
}: {
  frontFace: ReactNode;
  backFace: ReactNode;
  state: CardState;
  onClick: () => unknown;
}) {
  return (
    <div className={`${styles.card} ${styles[`card--${state}`]}`}>
      <div className={styles["card_group"]}>
        <div className={styles["card_back"]} onClick={onClick}>
          {backFace}
        </div>
        <div className={styles["card_front"]} onClick={onClick}>
          {frontFace}
        </div>
      </div>
    </div>
  );
}
