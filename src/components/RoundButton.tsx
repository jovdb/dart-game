import { PropsWithChildren } from "react";

export default function RoundButton({
  children,
  style,
}: PropsWithChildren<{ style?: React.CSSProperties }>) {
  return (
    <button
      style={{
        width: "calc(var(--card-height) * 0.1)",
        height: "calc(var(--card-height) * 0.1)",
        borderRadius: "50%",
        // background: "#ccc",
        border: "none",
        color: "white",
        verticalAlign: "middle",
        ...style,
      }}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}
