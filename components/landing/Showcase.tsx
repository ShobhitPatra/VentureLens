"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lens } from "../ui/lens";
import { TextAnimate } from "../ui/text-animate";

const Showcase = () => {
  return (
    <div className="rounded-md p-2 flex flex-col items-center justify-center gap-8 md:px-64 ">
      <motion.div
        className="flex flex-col items-center shadow-2xl shadow-gray-500/50 rounded-md "
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Lens>
          <Image
            className="md:w-[1000px] w-64 rounded-md "
            width={200}
            height={200}
            src="/images/report_example.png"
            alt="Lens Demo"
          />
        </Lens>
      </motion.div>
    </div>
  );
};

export default Showcase;
