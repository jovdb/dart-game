"use client";
import ThrowDeck from "./ThrowDeck";
import { useCards, useCardsActions } from "@/stores/cardState";
import ChallengeDeck from "./ChallengeDeck";

import styles from "./page.module.css";
import useResizeObserver from "use-resize-observer";
import { useMemo, useState } from "react";
import { fitInRect, shrinkRect } from "./math";

export default function Home() {
  const throwCardInfo = useCards((s) => s.throwCard);
  const isThrowFlipped = useCards((s) => s.isThrowFlipped);
  const challengeCardInfo = useCards((s) => s.challengeCard);
  const isChallengeFlipped = useCards((s) => s.isChallengeFlipped);
  const [isBlocked, setIsBlocked] = useState(0);
  const {
    nextThrowCard,
    closeThrowCard,
    nextChallengeCard,
    closeChallengeCard,
  } = useCardsActions();

  const {
    ref: contentRef,
    width: contentWidth = 1,
    height: contentHeight = 1,
  } = useResizeObserver<HTMLDivElement>();

  const {
    ref: cardsRef,
    width: cardsWidth = 1,
    height: cardsHeight = 1,
  } = useResizeObserver<HTMLSpanElement>();

  const transform = useMemo(() => {
    const cardSize = { width: cardsWidth, height: cardsHeight };
    const targetRect = shrinkRect(
      {
        width: contentWidth,
        height: contentHeight,
        top: 0,
        left: 0,
      },
      20,
      50,
      20,
      50
    );

    return fitInRect(cardSize, targetRect);
  }, [cardsHeight, cardsWidth, contentHeight, contentWidth]);

  return (
    <div className={styles.app} style={{ pointerEvents: isBlocked ? "none" : "auto"}}>
      <div></div>
      <div className={styles.content} ref={contentRef}>
        {
          <span
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              position: "absolute",
              transformOrigin: "0 0",
            }}
          >
            <span
              ref={cardsRef}
              style={{
                display: "flex",
                // flexDirection: "row-reverse",
                textAlign: "center",
                flexDirection: contentWidth / contentHeight > 0.8 ? "row-reverse" : "column-reverse",
              }}
            >
              <span style={{ display: "inline-block", margin: "30px 20px"}}>
                <ChallengeDeck
                  {...challengeCardInfo}
                  flipped={isChallengeFlipped}
                  onClick={async () => {
                    if (isThrowFlipped) {
                      closeThrowCard();
                      await new Promise(resolve => {setTimeout(resolve, 500)});
                    }
                    if (isChallengeFlipped) {
                      closeChallengeCard();
                    } else {
                      nextChallengeCard();
                    }
                  }}
                  onAnimation={(isBusy) => {
                    setIsBlocked((prev) => isBusy ? prev + 1 : prev - 1);
                  }}
                />
              </span>

              <span style={{ display: "inline-block", margin: "30px 20px"}}>
                <ThrowDeck
                  {...throwCardInfo}
                  flipped={isThrowFlipped}
                  onClick={async () => {
                    if (isChallengeFlipped) {
                      closeChallengeCard();
                      await new Promise(resolve => {setTimeout(resolve, 500)});
                    }
                    if (isThrowFlipped) {
                      closeThrowCard();
                    } else {
                      nextThrowCard();
                    }
                  }}
                  onAnimation={(isBusy) => {
                    setIsBlocked((prev) => isBusy ? prev + 1 : prev - 1);
                  }}
                />
              </span>
            </span>
          </span>
        }
      </div>
      <div></div>
    </div>
  );
}
