import { ReactNode } from "react";

import styles from "./Card.module.css";
export type CardState = "unused" | "using" | "used";
export default function Card({
  frontFace,
  backFace,
  state,
}: {
  frontFace: ReactNode;
  backFace: ReactNode;
  state: CardState;
}) {
  return (
    <div className={`${styles.card} card--${state}`}>
      <div className={styles["card_back"]}>{backFace}</div>
      <div className={styles["card_front"]}>{frontFace}</div>
    </div>
  );
}
