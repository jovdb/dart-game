import ThrowDeck from "./ThrowDeck";
import { useChallengeCard, useThrowCard } from "@/stores/cardState";
import ChallengeDeck from "./ChallengeDeck";

import styles from "./Cards.module.css";
import useResizeObserver from "use-resize-observer";
import { useMemo, useState } from "react";
import { fitInRect, shrinkRect } from "../math";

export default function Cards() {
  const {
    card: throwCardInfo,
    isFlipped: isThrowFlipped,
    next: nextThrowCard,
    close: closeThrowCard,
  } = useThrowCard();

  const {
    card: challengeCardInfo,
    isFlipped: isChallengeFlipped,
    next: nextChallengeCard,
    close: closeChallengeCard,
  } = useChallengeCard();

  const [isBlocked, setIsBlocked] = useState(0);

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

  const showVertical = contentWidth / contentHeight < 0.8;

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
      30,
      20,
      30
    );

    return fitInRect(cardSize, targetRect);
  }, [cardsHeight, cardsWidth, contentHeight, contentWidth]);

  return (
    <div
      className={styles.app}
      style={{ pointerEvents: isBlocked ? "none" : "auto" }}
      onClick={() => {
        // Close Both
        if (isChallengeFlipped) closeChallengeCard();
        if (isThrowFlipped) closeThrowCard();
      }}
    >
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
                flexDirection: showVertical ? "column-reverse" : "row-reverse",
              }}
            >
              <span style={{ display: "inline-block", margin: "30px 20px" }}>
                <ChallengeDeck
                  {...challengeCardInfo}
                  flipped={isChallengeFlipped}
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (isThrowFlipped) {
                      closeThrowCard();
                      await new Promise((resolve) => {
                        setTimeout(resolve, 800);
                      });
                    }
                    if (isChallengeFlipped) {
                      closeChallengeCard();
                      await new Promise((resolve) => {
                        setTimeout(resolve, 800);
                      });
                    }
                    nextChallengeCard();
                  }}
                  onAnimation={(isBusy) => {
                    setIsBlocked((prev) => (isBusy ? prev + 1 : prev - 1));
                  }}
                />
              </span>

              <span style={{ display: "inline-block", margin: "30px 20px" }}>
                <ThrowDeck
                  {...throwCardInfo}
                  flipped={isThrowFlipped}
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (isChallengeFlipped) {
                      closeChallengeCard();
                      await new Promise((resolve) => {
                        setTimeout(resolve, 800);
                      });
                    }
                    if (isThrowFlipped) {
                      closeThrowCard();
                      await new Promise((resolve) => {
                        setTimeout(resolve, 800);
                      });
                    }
                    nextThrowCard();
                  }}
                  onAnimation={(isBusy) => {
                    setIsBlocked((prev) => (isBusy ? prev + 1 : prev - 1));
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
