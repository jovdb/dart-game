"use client";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Card, { CardState } from "./Card";
import CardFace from "./CardFace";
import dancingDucksImg from "../../public/dance.png";
import dartImg from "../../public/dart.png";
import thumbUpImg from "../../public/thumb-up.png";

import { Fredoka } from "@next/font/google";
import styles from "./ThrowCard.module.css";
import RoundButton from "./RoundButton";

interface IThrowProps {
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

export function ThrowCardBack() {
  return (
    <CardFace className={fredokaFont.className}>
      <div
        style={{ margin: "0.5em 0 0.2em 0", textAlign: "center", fontSize: "5em", fontWeight: "bold" }}
      >
        Smijtkaart
      </div>
      <Image
        src={dancingDucksImg}
        alt=""
        style={{
          width: "calc(100% - 20px)",
          height: "auto",
          margin: "auto",
        }}
      />
    </CardFace>
  );
}

function ThrowCardFront({ task, winScore, arrowText }: IThrowProps) {
  return (
    <CardFace
      className={`${styles["throw-card"]} ${fredokaFont.className}`}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "2em",
        background: "#f8f8f8",
      }}
    >
      <div className={styles["throw-card_task"]}>{task}</div>
      <div className={styles["throw-card_score"]}>
        <RoundButton>
          <Image
            src={thumbUpImg}
            alt=""
            style={{ height: "2em", width: "auto" }}
          />
        </RoundButton>{" "}
        = {winScore < 0 ? "-" : "+"} {winScore}
      </div>
      <div className={styles["throw-card_darts"]}>
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

export default function ThrowCard(props: IThrowProps) {
  const [cardState, setCardState] = useState<CardState>("top");
  return (
    <Card
      frontFace={<ThrowCardFront {...props} />}
      backFace={<ThrowCardBack />}
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
