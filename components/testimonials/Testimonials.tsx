import { Marquee } from "../ui/marquee";
import { TextAnimate } from "../ui/text-animate";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "Sarah Chen",
    username: "@sarah ",
    body: "VentureLens cuts our initial screening time from weeks to minutes. The depth of analysis rivals our internal research team.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Robin",
    username: "@rob",
    body: "I can't believe what I'm able to uncover about startups in just seconds. This is a game-changer for deal flow.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Priya Agarwal",
    username: "@agpriya",
    body: "We used VentureLens to prepare for our Series A. The insights helped us strengthen our pitch deck significantly.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "James Rodriquez",
    username: "@jamesrodri",
    body: "The AI analysis is incredible. It surfaces risks and opportunities we would have taken weeks to identify.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Pedri Gonzalez",
    username: "@gonzalezpedri",
    body: "This is a must-have for anyone serious about startup investing. The ROI is immediate.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "David Kim",
    username: "@kim",
    body: "VentureLens has become our first step in due diligence. The competitive analysis alone is worth the subscription.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Testimonials = () => {
  return (
    <div className="md:w-[1000px] relative flex w-96 flex-col gap-8 items-center justify-center overflow-hidden md:py-8 ">
      <div className="text-center">
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-sm  text-orange-500 md:mt-14"
        >
          TRUSTED BY INVESTORS
        </TextAnimate>
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-3xl text-3xl text-black "
        >
          What people are saying
        </TextAnimate>
      </div>
      <div className="flex flex-col">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
};
export default Testimonials;
