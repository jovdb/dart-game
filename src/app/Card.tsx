import { ReactNode, useState } from "react";

import { useEffectEvent } from "../hooks/useEffectEvent";
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
  const animationDuration = 400;
  const style = { "--animation-duration": `${animationDuration}ms` }as React.CSSProperties;
  const [isBusy, setIsBusy] = useState(false);
  
  const onClickWithBlockDuringAnimation = useEffectEvent(() => {
    if (isBusy) return;
    setIsBusy(true);
    setTimeout(() => setIsBusy(false), animationDuration);
    onClick();
  });

  return (
    <div
      className={`${styles.card} ${styles[`card--${state}`]}`}
      style={style}
    >
      <div className={styles["card_group"]}>
        <div className={styles["card_back"]} onClick={onClickWithBlockDuringAnimation}>
          {backFace}
        </div>
        <div className={styles["card_front"]} onClick={onClickWithBlockDuringAnimation}>
          {frontFace}
        </div>
      </div>
    </div>
  );
}
