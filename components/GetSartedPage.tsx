"use client";
import Link from "next/link";
import { ArrowUpRightFromSquare, Github } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import MarqueeList from "./landing/Marquee";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import { TextAnimate } from "./ui/text-animate";
import { ShinyButton } from "./ui/shiny-button";
import { signIn } from "@/lib/auth-client";
import { useAuthWithConvex } from "@/hooks/useWithConvex";
import { Ripple } from "./ui/ripple";

const GetSartedPage = () => {
  const { user } = useAuthWithConvex();
  return (
    <div className="h-screen font-mono flex flex-col items-center justify-center pt-16 gap-8 md:px-64">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex"
        >
          <div className="md:text-6xl text-3xl font-bold ">VENTURE</div>
          <div className="md:text-6xl text-3xl font-bold text-orange-500">
            LENS
          </div>
        </motion.div>
        <AnimatedShinyText className="md:text-2xl text-xl text-gray-400">
          See Startups Clearly
        </AnimatedShinyText>
      </div>
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
      {user ? (
        <div className="bg-background relative flex h-[800px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
          <p className="z-10 text-center text-3xl font-medium tracking-tighter whitespace-pre-wrap text-orange-500">
            <span className="text-black">Already</span>
            <span className="text-orange-500"> a </span>
            <span className="text-black">User</span>
            <Link href="/" className="cursor-pointer">
              <ArrowUpRightFromSquare />
            </Link>
          </p>
          <Ripple />
        </div>
      ) : (
        <div>
          <div className="text-gray-700 font-bold text-center">JOIN NOW</div>
          <div className="flex md:gap-6 gap-2 md:p-8 flex-wrap items-center justify-center">
            <ShinyButton
              className="shadow-2xl shadow-blue-500/90 border-2 border-gray-300 bg-white hover:bg-blue-500 hover:text-white "
              onClick={() => signIn.social({ provider: "google" })}
            >
              <h6 className="text-black flex items-center justify-center font-bold gap-2 ">
                Continue with Google
                <span>
                  <FcGoogle size={24} />
                </span>
              </h6>
            </ShinyButton>
            <ShinyButton
              className="shadow-2xl shadow-green-500/90  bg-green-700 hover:bg-green-600"
              onClick={() => signIn.social({ provider: "github" })}
            >
              <h6 className="text-white flex items-center justify-center font-bold gap-2">
                Continue with Github
                <span>
                  <Github />
                </span>
              </h6>
            </ShinyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetSartedPage;
