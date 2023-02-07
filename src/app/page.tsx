"use client";
import ThrowDeck from "./ThrowDeck";
import { useCards, useCardsActions } from "@/stores/cardState";
import ChallengeDeck from "./ChallengeDeck";

import styles from "./page.module.css";
import useResizeObserver from "use-resize-observer";
import { useMemo } from "react";
import { fitInRect, shrinkRect } from "./math";

export default function Home() {
  const throwCardInfo = useCards((s) => s.currentThrowCard);
  const challengeCardInfo = useCards((s) => s.currentChallengeCard);
  const { nextThrowCard, nextChallengeCard } = useCardsActions();
  const cardHeight = 400;
  const cardWidth = (cardHeight * 64) / 89;
  const cardAr = cardWidth / cardHeight;

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

    const contentAr = contentWidth / contentHeight;
    const fitHeight =
      contentAr > cardAr ? contentHeight : contentWidth / cardAr;
    const fitWidth = fitHeight * cardAr;

    const fitScale = fitHeight / cardHeight;
    return {
      x: (contentWidth - fitWidth) / 2,
      y: (contentHeight - fitHeight) / 2,
      scale: fitScale,
    };
  }, [cardAr, contentHeight, contentWidth]);

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
            onNewCard={() => {
              nextChallengeCard();
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
