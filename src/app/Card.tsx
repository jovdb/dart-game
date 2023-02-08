import { ReactNode, useCallback, useState } from "react";

import { useEffectEvent } from "../hooks/useEffectEvent";
import "./Card.css";
type CardState = "top" | "flipped" | "bottom";

export default function Card({
  frontFace,
  backFace,
  showDeck,
  flipped = false,
  onClick,
}: {
  frontFace: ReactNode;
  backFace: ReactNode;
  showDeck: boolean;
  flipped: boolean;
  onClick: (newState: boolean) => unknown;
}) {
  const getState = useCallback<(flipped: boolean) => CardState>((flipped) => {
    if (flipped) return "flipped";
    if (showDeck) return "bottom";
    return "top";
  }, [showDeck]);

  const state = getState(flipped);
  const animationDuration = 500 * (showDeck && (state === "bottom") ? 1.5 : 1);

  const style = {
    "--animation-duration": `${animationDuration}ms`,
  } as React.CSSProperties;
  const [isBusy, setIsBusy] = useState(false);
  const [animationState, setAnimationState] = useState("");

  const onClickWithBlockDuringAnimation = useEffectEvent(() => {
    if (isBusy) return;
    setIsBusy(true);
    setTimeout(() => setIsBusy(false), animationDuration);

    setAnimationState(`${state}-to-${getState(!flipped)}`);
  
    onClick(!flipped);
  });

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
