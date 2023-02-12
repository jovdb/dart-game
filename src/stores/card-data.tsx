import { ReactNode } from "react";
import { isChallengeCardData, isThrowCardData, CardData } from "./cardState";

const cardData: CardData[] = [];

function SubTitle({ name }: { name: ReactNode }) {
  return (
    <>
      <br />
      <span style={{ fontSize: "0.65em" }}>{name}</span>
    </>
  );
}

// Loop over numbers
Array.from(Array(20)).forEach((_, index) => {
  const value = index + 1;
  cardData.push({
    task: (
      <>
        Gooi
        <br />*{value}
      </>
    ),
    arrowText: "max 3",
    winScore: 1,
    loseScore: -2,
    skipScore: -1,
  });

  let name = "";
  if (value === 1) name = "Annie's Attic";
  else if (value === 3) name = "Basement";
  else if (value === 7) name = "Double Quincy";
  else if (value === 20) name = "Tops";

  cardData.push({
    task: (
      <>
        Gooi
        <br />D{value}
        {name && <SubTitle name={`(${name})`} />}
      </>
    ),
    arrowText: "max 3",
    winScore: 2,
    loseScore: -1,
    skipScore: 0,
  });

  name = "";
  if (value === 6) name = "Devil";

  cardData.push({
    task: (
      <>
        Gooi
        <br />T{value}
        {name && <SubTitle name={`(${name})`} />}
      </>
    ),
    arrowText: "max 3",
    winScore: 2,
    loseScore: -1,
    skipScore: 0,
  });
});

// Less than
cardData.push({
  task: (
    <>
      Gooi
      <br />
      &lt;= 9
      <SubTitle name="(Fish)" />
    </>
  ),
  arrowText: "3",
  winScore: 3,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &lt; 20
    </>
  ),
  arrowText: "3",
  winScore: 2,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &lt; 30
    </>
  ),
  arrowText: "3",
  winScore: 1,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &lt; 50
    </>
  ),
  arrowText: "3",
  winScore: 1,
  loseScore: -2,
  skipScore: -1,
});

// Greater than
cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 40
    </>
  ),
  arrowText: "max 3",
  winScore: 1,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 50
    </>
  ),
  arrowText: "max 3",
  winScore: 1,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 60
    </>
  ),
  arrowText: "max 3",
  winScore: 2,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 70
    </>
  ),
  arrowText: "max 3",
  winScore: 2,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 80
    </>
  ),
  arrowText: "max 3",
  winScore: 3,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 90
    </>
  ),
  arrowText: "max 3",
  winScore: 3,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 100
    </>
  ),
  arrowText: "max 3",
  winScore: 3,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      &gt;= 150
      <SubTitle name="(High ton)" />
    </>
  ),
  arrowText: "max 3",
  winScore: 15,
  loseScore: 0,
  skipScore: 0,
});

// Named
cardData.push({
  task: (
    <>
      Gooi
      <br />
      25 of 50
      <SubTitle name={"(Bull)"} />
    </>
  ),
  arrowText: "max 6",
  winScore: 2,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      100
      <SubTitle name={"(Ton)"} />
    </>
  ),
  arrowText: "max 3",
  winScore: 2,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      95
      <SubTitle name={"(Baby Ton)"} />
    </>
  ),
  arrowText: "3",
  winScore: 10,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      50
      <SubTitle name={"(Bullseye)"} />
    </>
  ),
  arrowText: "max 6",
  winScore: 3,
  loseScore: -1,
  skipScore: 0,
});

// AND
cardData.push({
  task: (
    <>
      Gooi
      <br />
      *20 en *3
    </>
  ),
  arrowText: "max 6",
  winScore: 2,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle
        name={
          <>
            T5, T20, T1
            <br />
            <span style={{ fontSize: "0.7em" }}>(Champagne breakfast)</span>
          </>
        }
      />
    </>
  ),
  arrowText: "3",
  winScore: 20,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      1, 1, T1
      <SubTitle name={"(Ton of nails)"} />
    </>
  ),
  arrowText: "3",
  winScore: 5,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle
        name={
          <>
            T20, T20, 50
            <br />
            (Big Fish)
          </>
        }
      />
    </>
  ),
  arrowText: "3",
  winScore: 25,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle
        name={
          <>
            20, T20, D20
            <br />
            (Big Shangai)
          </>
        }
      />
    </>
  ),
  arrowText: "3",
  winScore: 20,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      20 en D20
      <SubTitle
        name={<span style={{ fontSize: "0.8em" }}>(Short Shanghai)</span>}
      />
    </>
  ),
  arrowText: "2",
  winScore: 5,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      3x D20
      <SubTitle name={"(Sousa)"} />
    </>
  ),
  arrowText: "3",
  winScore: 15,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      3x 50
      <SubTitle name={"(Hattrick)"} />
    </>
  ),
  arrowText: "3",
  winScore: 20,
  loseScore: -1,
  skipScore: 0,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      3x 1
      <SubTitle name={"(Bucket of nails)"} />
    </>
  ),
  arrowText: "max 6",
  winScore: 2,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      *11 en *6
    </>
  ),
  arrowText: "max 6",
  winScore: 1,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <br />
      *1, *2, *3
    </>
  ),
  arrowText: "max 6",
  winScore: 2,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle name="*18, *19, *20" />
    </>
  ),
  arrowText: "max 6",
  winScore: 2,
  loseScore: -1,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle
        name={
          <>
            5 en 20 en 1<br />
            <span style={{ fontSize: "0.8em" }}>(Bed & Breakfast)</span>
          </>
        }
      />
    </>
  ),
  arrowText: "max 6",
  winScore: 2,
  loseScore: -1,
  skipScore: -1,
});

// OR
cardData.push({
  task: (
    <>
      Gooi
      <SubTitle name="*5 of *20 of *1" />
    </>
  ),
  arrowText: "1",
  winScore: 1,
  loseScore: -3,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle name="*19 of *3 of *17" />
    </>
  ),
  arrowText: "1",
  winScore: 1,
  loseScore: -3,
  skipScore: -1,
});

// BETWEEN
cardData.push({
  task: (
    <>
      Gooi
      <SubTitle name="&gt;= 40 en &lt;= 50" />
    </>
  ),
  arrowText: "max 6",
  winScore: 1,
  loseScore: -2,
  skipScore: -1,
});

cardData.push({
  task: (
    <>
      Gooi
      <SubTitle
        name={
          <>
            &gt; 100 en &lt; 150
            <br />
            (Low Ton)
          </>
        }
      />
    </>
  ),
  arrowText: "max 6",
  winScore: 1,
  loseScore: -1,
  skipScore: 0,
});

// Checkout
Array.from(Array(50)).forEach(() => {
  const value = 1 + Math.floor(Math.random() * 120);
  let name = "";
  if (value === 25) name = "Devil's Finish";
  if (value === 130) name = "Baby Fish";

  cardData.push({
    task: (
      <>
        Checkout
        <br />
        {value}
        {name && <SubTitle name={`(${name})`} />}
      </>
    ),
    arrowText: "max 9",
    winScore: value > 100 ? 2 : 1,
    loseScore: -1,
    skipScore: 0,
  });
});

export const throwCards = cardData.filter(isThrowCardData);
export const challengeCards = cardData.filter(isChallengeCardData);
