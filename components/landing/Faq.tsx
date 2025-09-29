import { TextAnimate } from "../ui/text-animate";

const Faq = () => {
  return (
    <div className="font-mono flex flex-col gap-8 items-center md:py-8 md:px-64">
      <div className="text-center">
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-sm  text-orange-500"
        >
          FAQ
        </TextAnimate>
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-3xl text-3xl text-black"
        >
          Frequently Asked Questions
        </TextAnimate>
      </div>
      {/* faq accordian  */}
      <div className=" flex flex-col gap-1">
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-medium">
            What information do I need to provide?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Just paste the startup's website URL. Our AI does the rest—crawling
            their site, analyzing their business model, market position, and
            generating a detailed investment evaluation report.
          </div>
        </div>
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            How does VentureLens analyze startups?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            We use advanced AI to crawl and analyze startup websites, extracting
            key business intelligence. Our system evaluates 10+ critical
            dimensions including problem-solution fit, market opportunity,
            competitive positioning, team credibility, and financial
            viability—generating a comprehensive VC-grade report in seconds.
          </div>
        </div>
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            What if the startup doesn't have a website?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            We require a public website for analysis. However, you can analyze
            pitch decks and documents by upgrading to our Professional or
            Enterprise plans.
          </div>
        </div>
        <div className="collapse collapse-plus bg-white border border-gray-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            Do you store or share the analyzed data?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            All analyses are private to your account. We don't share or sell any
            data. You can delete reports anytime.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
