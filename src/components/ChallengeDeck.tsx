/* eslint-disable @next/next/no-img-element */
"use client";
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
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

interface IChallengeProps {
  task: ReactNode;
  winScore: number;
  loseScore: number;
  skipScore: number;
  arrowText: string;
  flipped: boolean;
  onClick(e: React.MouseEvent): unknown;
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
}: Readonly<IChallengeProps>) {
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
            <img
              src={thumbUpImg.src}
              width={thumbUpImg.width}
              height={thumbUpImg.height}
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
            <img
              src={thumbUpImg.src}
              width={thumbUpImg.width}
              height={thumbUpImg.height}
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
            <img
              src={unavailableImg.src}
              width={unavailableImg.width}
              height={unavailableImg.height}
              alt=""
              style={{
                height: "calc(var(--card-height) * 0.1)",
                width: "auto",
                transform:
                  "translate(calc(var(--card-height) * -0.015), calc(var(--card-height) * -0.01))",
              }}
            />
          </RoundButton>{" "}
          = {skipScore === 0 ? "-" : ""}
          {skipScore}
        </div>
      </div>
      <div className={styles["challenge-card_darts"]}>
        {arrowText}
        <img
          src={dartImg.src}
          width={dartImg.width}
          height={dartImg.height}
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

export default function ChallengeDeck(props: Readonly<IChallengeProps>) {

  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? "#70ce81" : "#bdffc9";
  return (
    <Card
      frontFace={<ChallengeCardFront {...props} />}
      backFace={<CardBack title="Challenge" backgroundColor={backgroundColor} />}
      flipped={props.flipped}
      onClick={props.onClick}
      showDeck
    ></Card>
  );
}
