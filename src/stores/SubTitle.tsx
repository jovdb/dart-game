import { ReactNode } from "react";


export function SubTitle({ name }: { name: ReactNode; }) {
  return (
    <>
      <br />
      <span style={{ fontSize: "0.65em" }}>{name}</span>
    </>
  );
}
