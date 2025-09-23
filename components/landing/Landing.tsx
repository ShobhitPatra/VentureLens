import Footer from "../footer/Footer";
import Hero from "./Hero";
import Showcase from "./Showcase";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-white">
      <Hero />
      <Showcase />
      <Footer />
    </div>
  );
};

export default Landing;
