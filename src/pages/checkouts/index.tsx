"use client";
import dynamic from "next/dynamic";

const ThrowDeck = dynamic(() => import("@/components/ThrowDeck"), {
  ssr: false,
});

import { checkoutCards } from "@/stores/checkouts-cards";
import { useMemo, useState } from "react";
import { animationFlipDuration } from "@/config";
import { waitAsync } from "@/async";
import useResizeObserver from "use-resize-observer";
import { fitInRect, shrinkRect } from "@/math";

function nextCard() {
  return checkoutCards[Math.floor(Math.random() * checkoutCards.length)];
}

export default function Home() {
  const [checkoutCard, setCheckOutCard] = useState(() => nextCard());
  const [flipped, setFlipped] = useState(false);
  const [isBlocked, setIsBlocked] = useState(0);

  const {
    ref: contentRef,
    width: cardsWidth = 1,
    height: cardsHeight = 1,
  } = useResizeObserver<HTMLSpanElement>();

  const {
    ref: pageRef,
    width: contentWidth = 1,
    height: contentHeight = 1,
  } = useResizeObserver<HTMLDivElement>();

  const transform = useMemo(() => {
    const cardSize = { width: cardsWidth, height: cardsHeight };
    const targetRect = shrinkRect(
      {
        width: contentWidth,
        height: contentHeight,
        top: 0,
        left: 0,
      },
      50,
      30,
      50,
      30
    );
    return fitInRect(cardSize, targetRect);
  }, [cardsHeight, cardsWidth, contentHeight, contentWidth]);

  return (
    <div
      ref={pageRef}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: isBlocked ? "none" : "auto",
      }}
      onClick={async (e) => {
        setIsBlocked((prev) => prev + 1);
        try {
          e.stopPropagation();
          // Close Both
          if (flipped) {
            setFlipped(false);
            await waitAsync(animationFlipDuration * 1.5);
          }
        } finally {
          setIsBlocked((prev) => prev - 1);
        }
      }}
    >
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "0 0",
        }}
        >
        
          <ThrowDeck
            task={checkoutCard.task}
            winScore={checkoutCard.winScore}
            arrowText={checkoutCard.arrowText}
            flipped={flipped}
            onClick={async (e) => {
              setIsBlocked((prev) => prev + 1);
              try {
                e.stopPropagation();
                // Close Both
                if (flipped) {
                  setFlipped(false);
                  await waitAsync(animationFlipDuration * 1.5);
                }
                setCheckOutCard(nextCard());
                setFlipped(true);
                await waitAsync(animationFlipDuration * 1.5);
              } finally {
                setIsBlocked((prev) => prev - 1);
              }
            }}
          />
      
      </div>
    </div>
  );
}
