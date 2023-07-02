import { checkoutTable } from "./checkout-table";

const cardData: any[] = [];

Object.entries(checkoutTable).forEach(([score, throws]) => {
  cardData.push({
    task: (
      <>
        Checkout
        <br />
        {score}
        <div style={{ height: "1.5rem" }}></div>
        {throws.map(
          // this code adds a horizontal rule and then displays the darts

          (darts, i) => (
            <>
              <span key={i} style={{ fontSize: "1.5rem" }}>
                {darts.join(" ")}{" "}
              </span>
            </>
          )
        )}
      </>
    ),
    arrowText: "",
    winScore: 0,
  });
});

export const checkoutCards = cardData;
