"use client";
import { checkoutTable } from "@/stores/checkout-table";
import { fredokaFont } from ".";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface ICheckoutTableRef {
  scrollIntoView(checkoutValue: number): void;
}

interface ICheckoutTableProps {
  scrollIntoView?: number;
}

export default forwardRef<ICheckoutTableRef, ICheckoutTableProps>(
  function CheckoutTable({ scrollIntoView: highlightScore }, parentRef) {
    const tableRef = useRef<HTMLTableElement>(null);

    useImperativeHandle(
      parentRef,
      () => ({
        scrollIntoView: (checkoutValue: number) => {
          // Scroll To element
          const el = tableRef.current?.querySelector(
            `#checkout-${checkoutValue}`
          );
          const parentEl = el?.parentElement?.parentElement?.parentElement;
          parentEl?.scrollTo({ behavior: "instant", top: 0 });
          const containerTop = parentEl?.getBoundingClientRect().top;

          containerTop &&
            el?.parentElement?.parentElement?.parentElement?.scrollTo({
              top: Math.round(
                el.getBoundingClientRect().top - containerTop - 20
              ),
              behavior: "instant",
            });
        },
      }),
      []
    );
    return (
      <table
        ref={tableRef}
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          margin: "1em auto",
          borderCollapse: "collapse",
        }}
        className={fredokaFont.className}
      >
        <tbody>
          {Object.entries(checkoutTable)
            .reverse()
            .map(([score, darts]) => {
              const isHighlighted =
                highlightScore && String(highlightScore) === score;
              return (
                <tr
                  key={score}
                  id={`checkout-${score}`}
                  style={{
                    borderRadius: 5,
                    background: isHighlighted ? "rgba(255, 165, 0, 0.5)" : "",
                    boxShadow: isHighlighted ? "0 0 15px rgb(255, 165, 0)" : "",
                  }}
                >
                  <td
                    style={{
                      paddingRight: "3rem",
                      paddingLeft: "1rem",
                      verticalAlign: "top",
                    }}
                  >
                    {score}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {darts.map((dart, index) => {
                      return <div key={index}>{dart.join(", ")}</div>;
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
);
