import { Marquee } from "../ui/marquee";
import MarqueeItem from "./MarqueeItem";

const MarqueeList = () => {
  return (
    <Marquee className="md:w-[1000px] w-96">
      <MarqueeItem heading="Better-Auth" />
      <MarqueeItem heading="Convex" />
      <MarqueeItem heading="Firecrawl" />
      <MarqueeItem heading="OpenAI" />
      <MarqueeItem heading="Scorecard.io" />
    </Marquee>
  );
};

export default MarqueeList;
