"use client";
import { useState } from "react";
import { ShinyButton } from "../ui/shiny-button";
import MarqueeList from "./Marquee";
import { MoveRight } from "lucide-react";

const Hero = () => {
  const [url, setUrl] = useState<string>("");
  const pollCrawl = async (crawl_id: string) => {
    try {
      let completed = false;
      while (!completed) {
        const crawl = await fetch(`/api/crawl-status?crawl_id=${crawl_id}`);
        const statusData = await crawl.json();
        if (statusData.status === "completed") {
          completed = true;
          return statusData.documents;
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch (error) {
      console.error(`CLIENT: ERROR POLLiNG`, error);
    }
  };
  const handleOnClick = async () => {
    try {
      const resposne = await fetch(`/api/crawl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
      if (!resposne.ok) {
        throw new Error("ERROR GETTING CRAWL_ID FROM SERVER ");
      }
      const data = await resposne.json();
      if (!data.crawl_id) {
        throw new Error("CRAWL_ID DID NOT REACHED THE CLIENT ");
      }
      const documents = await pollCrawl(data.crawl_id);
      console.log(documents);
    } catch (error) {
      console.error(`CLIENT: ERROR EVALUATING SITE URL`, error);
    }
  };
  return (
    <div className=" font-mono flex flex-col items-center justify-center  md:px-64 pt-16 gap-8">
      <div className="text-center">
        <h1 className="md:text-6xl text-2xl font-bold l">
          Venture<span className="text-orange-500">Lens</span>
        </h1>
        <h3 className="md:text-2xl text-xl text-gray-400">
          See Startups Clearly
        </h3>
      </div>
      {/* input  */}
      <div className="flex flex-wrap  justify-center gap-2">
        <label className="flex items-center gap-2 label rounded px-2 py-1 bg-background border border-gray-400 cursor-crosshair">
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
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
        <ShinyButton
          className="border-gray-400 text-primary bg-gray-100 hover:bg-orange-100"
          onClick={handleOnClick}
        >
          <span>
            <MoveRight />
          </span>
        </ShinyButton>
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
