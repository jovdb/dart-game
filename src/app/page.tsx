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
  const challengeCardInfo = useCards((s) => s.challengeCard);
  const isChallengeFlipped = useCards((s) => s.isChallengeFlipped);
console.log("isChallengeFlipped", isChallengeFlipped)
  const { nextThrowCard, nextChallengeCard, closeChallengeCard } = useCardsActions();
  const cardHeight = 400;
  const cardWidth = (cardHeight * 64) / 89;

  const {
    ref: contentRef,
    width: contentWidth = 1,
    height: contentHeight = 1,
  } = useResizeObserver<HTMLDivElement>();

  const transform = useMemo(() => {
    const cardSize = { width: cardWidth, height: cardHeight };
    const targetRect = shrinkRect(
      {
        width: contentWidth,
        height: contentHeight,
        top: 0,
        left: 0,
      },
      50, 50, 50 , 50,
    );

    return fitInRect(cardSize, targetRect);
  }, [cardWidth, contentHeight, contentWidth]);

  return (
    <div className={styles.app}>
      <div>HEADER</div>
      <div className={styles.content} ref={contentRef}>
        <span
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            position: "absolute",
            transformOrigin: "0 0",
          }}
        >
          <ChallengeDeck
            {...challengeCardInfo}
            flipped={isChallengeFlipped}
            onClick={(flipped) => {
              if (flipped) {
                nextChallengeCard();
              } else {
                closeChallengeCard();
              }
            }}
          />
        </span>
        {false && (
          <span style={{ margin: 20 }}>
            <ThrowDeck
              {...throwCardInfo}
              onNewCard={() => {
                nextThrowCard();
              }}
            />
          </span>
        )}
      </div>
      <div>Footer</div>
    </div>
  );
}
