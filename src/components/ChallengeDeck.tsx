"use client";
import Image from "next/image";
import { ReactNode } from "react";
import Card from "./Card";
import CardFace from "./CardFace";
import dartImg from "../../public/dart.png";
import thumbUpImg from "../../public/thumb-up.png";
import unavailableImg from "../../public/unavailable.png";

import { Fredoka } from "@next/font/google";
import styles from "./ChallengeDeck.module.css";
import RoundButton from "./RoundButton";
import { CardBack } from "./CardBack";

interface IChallengeProps {
  task: ReactNode;
  winScore: number;
  loseScore: number;
  skipScore: number;
  arrowText: string;
  flipped: boolean;
  onClick(e: React.MouseEvent, animationDuration: number): unknown;
}

// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

function ChallengeCardFront({
  task,
  winScore,
  loseScore,
  skipScore,
  arrowText,
}: IChallengeProps) {
  return (
    <CardFace
      className={`${styles["challenge-card"]} ${fredokaFont.className}`}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "2em",
      }}
    >
      <div className={styles["challenge-card_task"]}>{task}</div>
      <div className={styles["challenge-card_score"]}>
        <div>
          <RoundButton
            style={{
              background: "var(--color-green)",
            }}
          >
            <Image
              src={thumbUpImg}
              alt=""
              style={{
                height: "calc(var(--card-height) * 0.07)",
                width: "auto",
              }}
            />
          </RoundButton>{" "}
          = {winScore > 0 ? "+" : ""}
          {winScore}
        </div>
        <div>
          <RoundButton
            style={{
              background: "var(--color-red)",
            }}
          >
            <Image
              src={thumbUpImg}
              alt=""
              style={{
                height: "calc(var(--card-height) * 0.07)",
                width: "auto",
                transform: "rotateZ(180deg)",
              }}
            />
          </RoundButton>{" "}
          = {loseScore === 0 ? "-" : ""}
          {loseScore}
        </div>
        <div>
          <RoundButton
            style={{
              background: "transparent",
            }}
          >
            <Image
              src={unavailableImg}
              alt=""
              style={{
                height: "calc(var(--card-height) * 0.1)",
                width: "auto",
                transform: "translate(calc(var(--card-height) * -0.015), calc(var(--card-height) * -0.01))"
              }}
            />
          </RoundButton>{" "}
          = {skipScore === 0 ? "-" : ""}
          {skipScore}
        </div>
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
  return (
    <Card
      frontFace={<ChallengeCardFront {...props} />}
      backFace={<CardBack title="Challenge" backgroundColor="#bdffc9" />}
      flipped={props.flipped}
      onClick={props.onClick}
      showDeck
    ></Card>
  );
}
