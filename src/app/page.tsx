"use client";
import ThrowCard from "./ThrowCard";
import { useCards, useCardsActions } from "@/stores/cardState";

export default function Home() {
  const cardInfo = useCards((s) => s.currentCard);
  const { nextRandom } = useCardsActions();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ThrowCard
          {...cardInfo}
          onNewCard={() => {
            nextRandom();
          }}
        />
      </div>
    </>
  );
}
