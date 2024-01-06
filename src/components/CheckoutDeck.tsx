"use client";
import { ReactNode, forwardRef } from "react";
import { Fredoka } from "@next/font/google";

import Card from "./Card";
import CardFace from "./CardFace";
import { CardBack } from "./CardBack";

import styles from "./CheckoutDeck.module.css";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

interface ICheckoutProps {
  task: ReactNode;
  flipped: boolean;
  onInfoClick(e: React.MouseEvent): unknown;
  onClick(e: React.MouseEvent): unknown;
}

// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

function CheckoutCardFront({ task, onInfoClick }: Readonly<ICheckoutProps>) {
  return (
    <CardFace
      className={`${styles["throw-card"]} ${fredokaFont.className}`}
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "2em",
      }}
    >
      <div className={styles["throw-card_task"]}>
        {task}
        <svg
          fill="#000000"
          version="1.1"
          width="32px"
          height="32px"
          viewBox="0 0 416.979 416.979"
          style={{ marginTop: "0.3em" }}
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick(e);
          }}
        >
          <g>
            <path
              d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
		c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
		c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
		c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
		c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
            />
          </g>
        </svg>
      </div>
    </CardFace>
  );
}

export default forwardRef(function CheckoutDeck(
  props: ICheckoutProps,
  ref: React.Ref<HTMLDivElement>
) {
  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? "#fcbec9" : "#ffc7d1";

  return (
    <Card
      ref={ref}
      frontFace={<CheckoutCardFront {...props} />}
      backFace={<CardBack title="Checkout" backgroundColor={backgroundColor} />}
      flipped={props.flipped}
      onClick={props.onClick}
      showDeck
    ></Card>
  );
});
