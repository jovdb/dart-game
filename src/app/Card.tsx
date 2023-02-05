import { ReactNode, useState } from "react";

import { useEffectEvent } from "../hooks/useEffectEvent";
import "./Card.css";
export type CardState = "top" | "flipped" | "bottom";

export default function Card({
  frontFace,
  backFace,
  showDeck,
  state = "top",
  onClick,
}: {
  frontFace: ReactNode;
  backFace: ReactNode;
  showDeck: boolean;
  state: CardState;
  onClick: (newState: CardState) => unknown;
}) {
  const animationDuration = 500 * (showDeck && (state === "bottom") ? 2 : 1);
  const style = {
    "--animation-duration": `${animationDuration}ms`,
  } as React.CSSProperties;
  const [isBusy, setIsBusy] = useState(false);
  const [animationState, setAnimationState] = useState("");

  const onClickWithBlockDuringAnimation = useEffectEvent(() => {
    if (isBusy) return;
    setIsBusy(true);
    setTimeout(() => setIsBusy(false), animationDuration);

    let newState: CardState = "top";
    if (state === "top" || state === "bottom") newState = "flipped";
    if (state === "flipped") newState = showDeck ? "bottom" : "top";
    if (state !== newState) {
      setAnimationState(`${state}-to-${newState}`);
    }
    onClick(newState);
  });
  console.log(`card--${state}`, animationState && `card--${animationState}`);
  return (
    <div
      className={`card ${`card--${state}` ?? ""} ${
        (animationState && `card--${animationState}`) ?? ""
      }`}
      style={style}
    >
      {showDeck && <div className={"card_deck"}>{backFace}</div>}
      <div className={"card_move"}>
        <div className={"card_group"}>
          <div
            className={"card_back"}
            onClick={onClickWithBlockDuringAnimation}
          >
            {backFace}
          </div>
          <div
            className={"card_front"}
            onClick={onClickWithBlockDuringAnimation}
          >
            {frontFace}
          </div>
        </div>
      </div>
    </div>
  );
}
