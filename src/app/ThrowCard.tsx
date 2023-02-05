"use client";
import Card from "./Card";
import CardFace from "./CardFace";

export default function ThrowCard() {
  return (
    <Card
        frontFace={<CardFace style={{ background: "yellow"}}>FRONT</CardFace>}
        backFace={<CardFace style={{ background: "green"}}>BACK</CardFace>}
    ></Card>
  );
}
