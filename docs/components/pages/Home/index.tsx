import Highlights from "./Highlights";
import HeroContent from "./HeroContent";
import Features from "./Feature";
import { HomeDemo } from "../../HomDemo/Demo";

export default function HomeContent() {
  return (
    <>
      <HeroContent />
      <HomeDemo />
      <Highlights />
      <Features />
    </>
  );
}
