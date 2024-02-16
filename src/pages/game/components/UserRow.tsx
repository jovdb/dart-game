import create from "zustand";

import styles from "./UserRow.module.css";

interface IGameRowProps {
    userName: string;
    score: number;
    isActive: boolean;
}

export default function UserRow({ userName, score, isActive }: IGameRowProps) {
    return (
        <div className={`${styles["user-row"]} ${isActive ? styles["user-row__active"] : ""}`}>
            <div className={styles["user-row__user"]}>
                {userName}
            </div>
            <div className={`${styles["user-row__score"]} ${score > 99 ? styles["user-row__score--lg"] : ""}`}>
                {score}
            </div>
        </div>
    )
}