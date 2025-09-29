import Community from "../community/Community";
import Footer from "../Footer";
import Faq from "../landing/Faq";
import Hero from "../landing/Hero";
import Showcase from "../landing/Showcase";
import PricingCards from "../pricing/Pricing";
import Testimonials from "../testimonials/Testimonials";

const Landing = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-8
      // bg-white
      
     "
    >
      <Hero />
      <div id="showcase">
        <Showcase />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="pricing">
        <PricingCards />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div id="community">
        <Community />
      </div>
      <div className="h-0.5 bg-gray-200 md:w-[950px] mx-64  md:mt-16"></div>
      <Footer />
    </div>
  );
};

export default Landing;
