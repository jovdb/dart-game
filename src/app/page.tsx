import Image from "next/image";
import ThrowCard from "./ThrowCard";
import styles from "./page.module.css";

export default function Home() {
  const cardInfo = {
    winScore: 2,
    arrowText: "max 6",
    task: (
      <>
        Gooi <br />
        D19
      </>
    ),
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ThrowCard {...cardInfo}/>
      </div>
    </>
  );
}
