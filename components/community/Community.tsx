import { TextAnimate } from "../ui/text-animate";
import ContactCard from "./ContactCard";
import GlobeCard from "./GlobeCard";
import ImageCard from "./ImageCard";

const Community = () => {
  return (
    <div className="flex flex-col md:px-64 gap-8">
      <div className="text-center">
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-sm  text-orange-500"
        >
          CONNECT WORLDWIDE
        </TextAnimate>
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-3xl text-3xl text-black"
        >
          Ready to make smarter investment decisions?
        </TextAnimate>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap justify-center">
          <ImageCard />
          <GlobeCard />
        </div>
        <ContactCard />
      </div>
    </div>
  );
};

export default Community;
