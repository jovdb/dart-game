import Image from "next/image";
import ThrowCard from "./ThrowCard";
import styles from "./page.module.css";

export default function Home() {
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
        <ThrowCard />
      </div>
    </>
  );
}
