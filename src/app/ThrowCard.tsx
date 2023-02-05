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

export interface IThrowProps {
  task: ReactNode;
  winScore: number;
  arrowText: string;
}
// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

function ThrowCardBack() {
  return (
    <CardFace
      className={fredokaFont.className}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "3rem",
        background: "#f8f8f8",
      }}
    >
      <div style={{ margin: "2rem 0 2rem " }}>Smijtkaart</div>
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
        fontSize: "2rem",
        background: "#f8f8f8",
      }}
    >
      <div className={styles["throw-card_task"]}>{task}</div>
      <div className={styles["throw-card_score"]}>
        <RoundButton>
          <Image
            src={thumbUpImg}
            alt=""
            style={{ height: "2rem", width: "auto" }}
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
            width: "1.15rem",
            height: "auto",
            margin: "auto",
          }}
        />
      </div>
    </CardFace>
  );
}

export default function ThrowCard(props: IThrowProps) {
  const [cardState, setCardState] = useState<CardState>("unused");
  return (
    <Card
      frontFace={<ThrowCardFront {...props} />}
      backFace={<ThrowCardBack />}
      state={cardState}
      onClick={() => {
        setCardState((prev) => {
          if (prev === "unused") return "using";
          if (prev === "using") return "used";
          return "unused";
        });
      }}
    ></Card>
  );
}
