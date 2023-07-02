import dynamic from "next/dynamic";

const ThrowDeck = dynamic(() => import("@/components/ThrowDeck"), {
  ssr: false,
});

import { checkoutCards } from "@/stores/checkouts-cards";
import { useState } from "react";
import { animationFlipDuration } from "@/config";
import { waitAsync } from "@/async";

function nextCard() {
  return checkoutCards[Math.floor(Math.random() * checkoutCards.length)];
}

export default function Home() {
  const [checkoutCard, setCheckOutCard] = useState(() => nextCard());
  const [flipped, setFlipped] = useState(false);
  const [isBlocked, setIsBlocked] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: isBlocked ? "none" : "auto"
      }}
      onClick={async(e) => {
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
      <ThrowDeck
        task={checkoutCard.task}
        winScore={checkoutCard.winScore}
        arrowText={checkoutCard.arrowText}
        flipped={flipped}
        onClick={async(e) => {
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
  );
}
