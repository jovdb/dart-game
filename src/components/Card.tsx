import { usePrevious } from "@/hooks/usePrevious";
import clsx from "clsx";
import { ReactNode, forwardRef, useCallback } from "react";

import { useEffectEvent } from "../hooks/useEffectEvent";
import { animationFlipDuration } from "@/config";
type CardState = "top" | "flipped" | "bottom";

export default forwardRef(function Card({
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
  onClick: (e: React.MouseEvent) => unknown;
}, ref: React.Ref<HTMLDivElement>) {
  const getState = useCallback<(flipped: boolean) => CardState>(
    (flipped) => {
      if (flipped) return "flipped";
      if (showDeck) return "bottom";
      return "top";
    },
    [showDeck]
  );

  const prevFlipped = usePrevious(flipped); // To prevent an unneeded animation at the start
  const state = getState(flipped);
  const animationState =
    prevFlipped === undefined || prevFlipped === flipped
      ? ""
      : `${getState(prevFlipped)}-to-${state}`;

  const animationDuration = showDeck ? animationFlipDuration * 1.5 : animationFlipDuration;
  const style = {
    "--animation-duration": `${animationDuration}ms`,
    "--animation-flipped-duration": `${animationFlipDuration}ms`,
  } as React.CSSProperties;

  const onClickCard = useEffectEvent((e) => {
    onClick(e);
  });

  const className = clsx([
    "card",
    `card--${state}`,
    animationState && `card--${animationState}`,
  ]);

  return (
    <div className={className} style={style} ref={ref}>
      {showDeck && <div className={"card_deck"}>{backFace}</div>}
      <div className={"card_move"}>
        <div className={"card_group"}>
          <button className={"card_back"} onClick={onClickCard} tabIndex={-1}>
            {backFace}
          </button>
          <button className={"card_front"} onClick={onClickCard}>
            {frontFace}
          </button>
        </div>
      </div>
    </div>
  );
});
