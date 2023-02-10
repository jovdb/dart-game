"use client";
import ThrowDeck from "./ThrowDeck";
import { useCards, useCardsActions } from "@/stores/cardState";
import ChallengeDeck from "./ChallengeDeck";

import styles from "./page.module.css";
import useResizeObserver from "use-resize-observer";
import { useMemo } from "react";
import { fitInRect, shrinkRect } from "./math";

export default function Home() {
  const throwCardInfo = useCards((s) => s.throwCard);
  const isThrowFlipped = useCards((s) => s.isThrowFlipped);
  const challengeCardInfo = useCards((s) => s.challengeCard);
  const isChallengeFlipped = useCards((s) => s.isChallengeFlipped);
  const {
    nextThrowCard,
    closeThrowCard,
    nextChallengeCard,
    closeChallengeCard,
  } = useCardsActions();
  const cardHeight = 400;
  const cardWidth = (cardHeight * 64) / 89;

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
    <div className={styles.app}>
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
                flexDirection: "row-reverse",
                textAlign: "center",
              }}
            >
              <span style={{ display: "inline-block", margin: 20 }}>
                <ChallengeDeck
                  {...challengeCardInfo}
                  flipped={isChallengeFlipped}
                  onClick={(newFlipped) => {
                    if (newFlipped) {
                      nextChallengeCard();
                    } else {
                      closeChallengeCard();
                    }
                  }}
                />
              </span>

              <span style={{ display: "inline-block", margin: 20 }}>
                <ThrowDeck
                  {...throwCardInfo}
                  flipped={isThrowFlipped}
                  onClick={(newFlipped) => {
                    if (newFlipped) {
                      nextThrowCard();
                    } else {
                      closeThrowCard();
                    }
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
