import dynamic from 'next/dynamic'

const Cards = dynamic(() => import("@/components/Cards"), {
  ssr: false,
});

export default function Home() {

  return (
    <Cards />
  );
}
