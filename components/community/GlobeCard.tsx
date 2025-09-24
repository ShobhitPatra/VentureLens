import { Globe } from "../ui/globe";

const GlobeCard = () => {
  return (
    <div className="md:h-[400px] md:w-[400px] h-[300px] w-[300px] font-mono relative flex size-full  items-center justify-center overflow-hidden rounded-lg  bg-background px-40 pb-40 pt-8 md:pb-60">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        EVALUATE WHERE YOU STAND
      </span>
      <Globe className="top-38" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
};

export default GlobeCard;
