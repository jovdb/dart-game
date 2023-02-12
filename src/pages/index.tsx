import dynamic from 'next/dynamic'

const Cards = dynamic(() => import("@/components/Cards"), {
  ssr: false,
});

import "@/stores/gameState";

export default function Home() {

  return (
    <Cards />
  );
}
