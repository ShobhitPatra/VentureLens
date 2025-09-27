"use client";
import { useState } from "react";
import { ShinyButton } from "../ui/shiny-button";
import MarqueeList from "./Marquee";
import { Loader2, MoveRight } from "lucide-react";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { TextAnimate } from "../ui/text-animate";
import { useReport } from "@/store/useReport";
import { useRouter } from "next/navigation";

const LOADING_MESSAGESS = {
  get_crawl_id: [
    "Initializing website analysis pipeline",
    "Contacting crawler network… assigning crawl ID",
    "Preparing to fetch site data",
  ],
  poll_crawl_url: [
    "Extracting raw content from the website",
    "Gathering text, stripping away design fluff…",
  ],
  analyze_llmResponse: [
    "Scanning extracted content for business insights",
    "Evaluating startup across 10+ venture metrics…",
    "Finalizing VentureLens scorecard…",
  ],
};

const Hero = () => {
  const [url, setUrl] = useState<string>("https://example.com/");
  const [loadingMessage, setloadingMessage] = useState<string>("");
  const { setReport } = useReport();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const pollCrawl = async (crawl_id: string) => {
    setloadingMessage(LOADING_MESSAGESS.poll_crawl_url[0]);
    try {
      setloadingMessage(LOADING_MESSAGESS.poll_crawl_url[1]);
      let completed = false;
      while (!completed) {
        const crawl = await fetch(`/api/crawl-status?crawl_id=${crawl_id}`);
        const statusData = await crawl.json();
        if (statusData.status === "completed") {
          completed = true;
          return statusData.document[0];
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch (error) {
      console.error(`CLIENT: ERROR POLLiNG`, error);
    }
  };
  const analyzeContent = async (markdownContent: string) => {
    setloadingMessage(LOADING_MESSAGESS.analyze_llmResponse[0]);
    try {
      setloadingMessage(LOADING_MESSAGESS.analyze_llmResponse[1]);
      const llmResponse = await fetch(`/api/analyze/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crawlData: markdownContent,
        }),
      });
      const llmData = await llmResponse.json();
      setloadingMessage(LOADING_MESSAGESS.analyze_llmResponse[2]);
      return llmData;
    } catch (error) {
      console.error(`CLIENT: ERROR POLLiNG`, error);
    }
  };
  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      setloadingMessage(LOADING_MESSAGESS.get_crawl_id[0]);
      const resposne = await fetch(`/api/crawl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });
      setloadingMessage(LOADING_MESSAGESS.get_crawl_id[1]);
      if (!resposne.ok) {
        throw new Error("ERROR GETTING CRAWL_ID FROM SERVER ");
      }

      const data = await resposne.json();
      if (!data.crawl_id) {
        throw new Error("CRAWL_ID DID NOT REACHED THE CLIENT ");
      }
      setloadingMessage(LOADING_MESSAGESS.get_crawl_id[2]);
      const markdownContent = await pollCrawl(data.crawl_id);
      const report = await analyzeContent(markdownContent);
      setReport(report);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.error(`CLIENT: ERROR EVALUATING SITE URL`, error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="font-mono flex flex-col items-center justify-center pt-16 gap-8 md:px-64">
      <div className="text-center">
        <div className="flex">
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            className="md:text-6xl text-3xl font-bold "
          >
            VENTURE
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            className="md:text-6xl text-3xl font-bold text-orange-500"
          >
            LENS
          </TextAnimate>
        </div>
        <AnimatedShinyText className="md:text-2xl text-xl text-gray-400">
          See Startups Clearly
        </AnimatedShinyText>
      </div>
      {/* input  */}

      {isLoading ? (
        <div className="flex flex-wrap justify-center gap-2 p-4">
          <h6 className="animate-pulse flex items-center gap-3 text-gray-800">
            {loadingMessage}
            <span>
              <Loader2 className="animate-spin" size={16} />
            </span>
          </h6>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
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
      )}
      {/* partners  */}
      <h3 className="text-center text-gray-600">
        <p>AI crawls, analyzes, and scores any startup instantly. </p>
        <p>
          From clarity to business model, get a VC-style evaluation in seconds.
        </p>
      </h3>
      <div>
        <h4 className="text-orange-500 text-center text-sm">POWERED BY</h4>
        <MarqueeList />
      </div>
    </div>
  );
};

export default Hero;
