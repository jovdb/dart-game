"use client";
import Image from "next/image";
import { useState } from "react";
import Card, { CardState } from "./Card";
import CardFace from "./CardFace";
import dancingDucks from "../../public/dance.png";

import { Fredoka } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

export function ThrowCardFace() {
  return (
    <CardFace
      style={{
        background: "#f8f8f8",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          className={fredokaFont.className}
          style={{
            fontWeight: "bold",
            margin: "2rem 0 2rem ",
            textAlign: "center",
            fontSize: "3rem",
          }}
        >
          Smijtkaart
        </div>
        <Image
          src={dancingDucks}
          alt=""
          style={{
            width: "calc(100% - 20px)",
            height: "auto",
            margin: "auto",
            textAlign: "center",
          }}
        />
      </div>
    </CardFace>
  );
}

export default function ThrowCard() {
  const [cardState, setCardState] = useState<CardState>("unused");
  return (
    <Card
      frontFace={<CardFace style={{ background: "green" }}>BACK</CardFace>}
      backFace={<ThrowCardFace />}
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
