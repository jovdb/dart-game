import { Fredoka } from "@next/font/google";
import CheckoutTable from "./CheckoutTable";

// If loading a variable font, you don't need to specify the font weight
export const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

export default CheckoutTable;
