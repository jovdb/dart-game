/* eslint-disable @next/next/no-img-element */
"use client";
import CardFace from "./CardFace";
import dancingDucksImg from "../../public/dance.png";

import { Fredoka } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

export function CardBack({
  title,
  backgroundColor,
}: Readonly<{
  title: string;
  backgroundColor: string;
}>) {
  return (
    <CardFace
      className={fredokaFont.className}
      style={{
        backgroundColor,
      }}
    >
      <div
        style={{
          margin: "0.5em 0 0.2em 0",
          textAlign: "center",
          fontSize: "5em",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
      <img
        src={dancingDucksImg.src}
        width={dancingDucksImg.width}
        height={dancingDucksImg.height}
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
