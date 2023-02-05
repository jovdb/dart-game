"use client";
import { useState } from "react";
import Card, { CardState } from "./Card";
import CardFace from "./CardFace";

export default function ThrowCard() {

const [cardState, setCardState] = useState<CardState>("unused");
  return (
    <Card
        frontFace={<CardFace style={{ background: "yellow"}}>FRONT</CardFace>}
        backFace={<CardFace style={{ background: "green"}}>BACK</CardFace>}
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
