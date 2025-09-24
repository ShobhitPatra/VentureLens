import { GithubIcon, LinkedinIcon, X } from "lucide-react";
import { FlickeringGrid } from "../ui/flickering-grid";
import { HyperText } from "../ui/hyper-text";

const ContactCard = () => {
  return (
    <div className="relative h-[200px] overflow-hidden rounded-lg bg-background md:px-16 md:py-8 font-mono flex justify-evenly items-center text-gray-800">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="avatar absolute left-16 ">
        <div className="w-24 rounded-xl">
          <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
        </div>
      </div>
      <div className="md:absolute opacity-0 md:opacity-100 ">
        <HyperText>Shobhit Patra</HyperText>
        <h4>shobhitpatra.dev@gmail.com</h4>
      </div>
      <div className="flex flex-col absolute right-16">
        <a
          href="https://github.com/ShobhitPatra"
          className="hover:text-blue-500 hover:underline hover:cursor-pointer"
        >
          <h6 className="hover:text-blue-500 flex items-center justify-start gap-1 hover:underline hover:cursor-pointer ">
            Github
            <span>
              <GithubIcon size={16} />
            </span>
          </h6>
        </a>
        <a href="/https://www.linkedin.com/in/shobhit-patra-4a4243264/">
          <h6 className="hover:text-blue-500 flex items-center justify-start gap-1 hover:underline hover:cursor-pointer">
            LinkedIn
            <span>
              <LinkedinIcon size={16} />
            </span>
          </h6>
        </a>
        <a href="https://x.com/home">
          <h6 className="hover:text-blue-500 flex items-center justify-start gap-1 hover:underline hover:cursor-pointer">
            X
            <span>
              <X size={16} />
            </span>
          </h6>
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
