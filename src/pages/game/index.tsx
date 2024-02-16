"use client";

import UserRow from "./components/UserRow";
import { useGameActions, useUserIndex, useUsers } from "./gameStore";

export default function Page() {

  const users = useUsers();
  const userIndex = useUserIndex();
  const { setNextUser } = useGameActions();

  if (!users.length) return "No players configured"

  return (
    <div>
      {users.map((user, index) => (
        <UserRow
          userName={user.userName}
          score={user.score}
          isActive={index === userIndex}
        />
      ))}
      <button onClick={() => {
        setNextUser();
      }}>Next</button>
    </div>
  );
}
