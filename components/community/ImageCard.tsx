import { User2 } from "lucide-react";
import { BentoCard } from "../ui/bento-grid";
import Image from "next/image";

const feature = {
  Icon: User2,
  name: "JOIN",
  description: "Start your free trial today.",
  href: "/",
  cta: "Login Now",
  background: (
    <Image
      width={200}
      height={200}
      alt="demoimage"
      src="/images/report_example.png"
      className="absolute w-full h-full opacity-30 "
    />
  ),
  className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
};
const ImageCard = () => {
  return <BentoCard {...feature} className="md:w-[500px] font-mono" />;
};

export default ImageCard;
