/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { ReactNode, forwardRef } from "react";
import Card from "./Card";
import CardFace from "./CardFace";
import dartImg from "../../public/dart.png";
import thumbUpImg from "../../public/thumb-up.png";

import { Fredoka } from "@next/font/google";
import styles from "./ThrowDeck.module.css";
import RoundButton from "./RoundButton";
import { CardBack } from "./CardBack";

interface IThrowProps {
  task: ReactNode;
  winScore?: number;
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

function ThrowCardFront({ task, winScore, arrowText }: IThrowProps) {
  return (
    <CardFace
      className={`${styles["throw-card"]} ${fredokaFont.className}`}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "2em",
      }}
    >
      <div className={styles["throw-card_task"]}>{task}</div>
      {!!winScore && (
        <div className={styles["throw-card_score"]}>
          <RoundButton style={{ backgroundColor: "var(--color-green)" }}>
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
          = {winScore < 0 ? "-" : "+"} {winScore}
        </div>
      )}
      {!!arrowText && (
        <div className={styles["throw-card_darts"]}>
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
      )}
    </CardFace>
  );
}

export default forwardRef(function ThrowDeck(
  props: IThrowProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <Card
      ref={ref}
      frontFace={<ThrowCardFront {...props} />}
      backFace={<CardBack title="SmijtKaart" backgroundColor="#f0c7ff" />}
      flipped={props.flipped}
      onClick={props.onClick}
      showDeck
    ></Card>
  );
});
