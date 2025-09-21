import { Marquee } from "../ui/marquee";
import { ShinyButton } from "../ui/shiny-button";
import MarqueeList from "./Marquee";

const Hero = () => {
  return (
    <div className=" font-mono flex flex-col items-center justify-center  md:px-64 pt-16 gap-8">
      <div className="text-center">
        <h1 className="md:text-6xl text-2xl font-bold l">
          Venture<span className="text-orange-300">Lens</span>
        </h1>
        <h3 className="md:text-2xl text-xl  text-gray-400">
          See Startups Clearly
        </h3>
      </div>
      {/* input  */}
      <div className="flex gap-2">
        <label className="flex items-center gap-2 label rounded px-2 py-1  bg-background border border-gray-600">
          <input
            type="search"
            className="grow bg-transparent outline-none"
            placeholder="paste site url"
          />
          <kbd className="kbd kbd-sm  border-gray-200 border bg-background">
            ⌘
          </kbd>
          <kbd className="kbd kbd-sm  border-gray-200 border bg-background">
            K
          </kbd>
        </label>
        <ShinyButton className="border-gray-600">Search</ShinyButton>
      </div>
      {/* partneres  */}
      <h3 className="text-center text-gray-600">
        <p>AI crawls, analyzes, and scores any startup instantly. </p>
        <p>
          From clarity to business model, get a VC-style evaluation in seconds.
        </p>
      </h3>
      <div>
        <h4 className="text-orange-500 text-center">powered by</h4>
        <MarqueeList />
      </div>
    </div>
  );
};

export default Hero;
