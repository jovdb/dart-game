"use client";
import dynamic from "next/dynamic";

const ThrowDeck = dynamic(() => import("@/components/ThrowDeck"), {
  ssr: false,
});

import { checkoutCards } from "@/stores/checkouts-cards";
import { useMemo, useRef, useState } from "react";
import { animationFlipDuration } from "@/config";
import { waitAsync } from "@/async";
import useResizeObserver from "use-resize-observer";
import { fitInRect, shrinkRect } from "@/math";
import CheckoutTable from "../checkout-table";
import { ICheckoutTableRef } from "../checkout-table/CheckoutTable";
import CheckoutDeck from "@/components/CheckoutDeck";

function nextCard() {
  return checkoutCards[Math.floor(Math.random() * checkoutCards.length)];
}

export default function Home() {
  const [checkoutCard, setCheckOutCard] = useState(checkoutCards[0]);
  const [flipped, setFlipped] = useState(false);
  // prevent clicks during animation
  const [isBlocked, setIsBlocked] = useState(0);
  const [showDropDownScore, setShowDropDownScore] = useState(0);

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

  const checkoutTableRef = useRef<ICheckoutTableRef>(null);

  const transform = useMemo(() => {
    const cardSize = { width: cardsWidth, height: cardsHeight };
    const targetRect = shrinkRect(
      {
        width: contentWidth,
        height: contentHeight,
        top: 0,
        left: 0,
      },
      Math.max(25, contentHeight * 0.1),
      Math.max(15, contentWidth * 0.15),
      Math.max(25, contentHeight * 0.1),
      Math.max(15, contentWidth * 0.15)
    );
    return fitInRect(cardSize, targetRect);
  }, [cardsHeight, cardsWidth, contentHeight, contentWidth]);

  const dropDownDurationInMs = 300;
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
        <CheckoutDeck
          task={checkoutCard.task}
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
          onInfoClick={async () => {
            setIsBlocked((prev) => prev + 1);
            try {
              if (flipped) {
                const checkoutValue = checkoutCard.checkoutValue;

                checkoutTableRef.current?.scrollIntoView(checkoutValue);

                await waitAsync(20);
                setShowDropDownScore(checkoutValue);
                await waitAsync(animationFlipDuration);
              }
            } finally {
              setIsBlocked((prev) => prev - 1);
            }
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          background: "#fff",
          left: -1,
          right: -1,
          height: "100%",
          borderBottom: "1px solid black",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          transition: `transform ${dropDownDurationInMs}ms ease-in-out`,
          transform: `translateY(${
            showDropDownScore ? "0" : `${contentHeight + 20}px`
          })`,
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            overflow: "auto",
          }}
        >
          <CheckoutTable
            scrollIntoView={showDropDownScore}
            ref={checkoutTableRef}
          />
        </div>
        <span
          style={{
            position: "absolute",
            display: "inline-block",
            top: "1em",
            right: "1em",
            width: 32,
            height: 32,
          }}
          onClick={async (e) => {
            setIsBlocked((prev) => prev + 1);
            try {
              e.stopPropagation();
              setShowDropDownScore(0);
              await waitAsync(dropDownDurationInMs);
            } finally {
              setIsBlocked((prev) => prev - 1);
            }
          }}
        >
          <svg
            width={32}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 41.756 41.756"
          >
            <path
              d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
		c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
		C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
		c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
