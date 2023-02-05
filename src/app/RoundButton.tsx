import { Children, PropsWithChildren } from "react";

export default function RoundButton({ children }: PropsWithChildren) {
  return (
    <button
      style={{
        width: "3em",
        height: "3em",
        borderRadius: "50%",
        background: "var(--color-green)",
        border: "none",
        color: "white",
        margin: "0 0.5em",
        marginTop: 1,
      }}
    >
      {children}
    </button>
  );
}
