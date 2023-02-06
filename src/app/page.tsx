"use client";
import ThrowDeck from "./ThrowDeck";
import { useCards, useCardsActions } from "@/stores/cardState";
import ChallengeDeck from "./ChallengeDeck";

export default function Home() {
  const throwCardInfo = useCards((s) => s.currentThrowCard);
  const challengeCardInfo = useCards((s) => s.currentChallengeCard);
  const { nextThrowCard, nextChallengeCard } = useCardsActions();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div>HEADER</div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ margin: 20 }}>
          <ChallengeDeck
            {...challengeCardInfo}
            onNewCard={() => {
              nextChallengeCard();
            }}
          />
        </span>
        <span style={{ margin: 20 }}>
          <ThrowDeck
            {...throwCardInfo}
            onNewCard={() => {
              nextThrowCard();
            }}
          />
        </span>
      </div>
      <div>Footer</div>
    </div>
  );
}
