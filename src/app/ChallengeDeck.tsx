"use client";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Card, { CardState } from "./Card";
import CardFace from "./CardFace";
import dartImg from "../../public/dart.png";
import thumbUpImg from "../../public/thumb-up.png";

import { Fredoka } from "@next/font/google";
import styles from "./ChallengeDeck.module.css";
import RoundButton from "./RoundButton";
import { CardBack } from "./CardBack";

interface IChallengeProps {
  task: ReactNode;
  winScore: number;
  arrowText: string;
  onNewCard(): unknown;
}

// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

function ChallengeCardFront({ task, winScore, arrowText }: IChallengeProps) {
  return (
    <CardFace
      className={`${styles["challenge-card"]} ${fredokaFont.className}`}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "2em",
        background: "#f8f8f8",
      }}
    >
      <div className={styles["challenge-card_task"]}>{task}</div>
      <div className={styles["challenge-card_score"]}>
        <RoundButton>
          <Image
            src={thumbUpImg}
            alt=""
            style={{ height: "2em", width: "auto" }}
          />
        </RoundButton>{" "}
        = {winScore < 0 ? "-" : "+"} {winScore}
      </div>
      <div className={styles["challenge-card_darts"]}>
        {arrowText}
        <Image
          src={dartImg}
          alt=""
          style={{
            width: "0.85em",
            height: "auto",
            margin: "auto",
            transform: "translateY(3px)",
          }}
        />
      </div>
    </CardFace>
  );
}

export default function ChallengeDeck(props: IChallengeProps) {
  const [cardState, setCardState] = useState<CardState>("top");
  return (
    <Card
      frontFace={<ChallengeCardFront {...props} />}
      backFace={
        <CardBack
          title="Challange"
          backgroundColor="#bdffc9"
        />
      }
      state={cardState}
      onClick={(newState) => {
        setCardState(newState);
        if (newState === "flipped") {
          props.onNewCard();
        }
      }}
      showDeck
    ></Card>
  );
}
