import { AppProps } from "next/app";
import Head from "next/head";
import "../globals.css";
import "@/components/Card.css";
import { Fredoka } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const fredokaFont = Fredoka({
  subsets: ["latin"],
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dart Game</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          html {
            --font-family: ${fredokaFont.style.fontFamily};
            font-family: ${fredokaFont.style.fontFamily};
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
