// PricingCards.js file
import React from "react";
import { TextAnimate } from "../ui/text-animate";

const PricingCards = () => {
  const cardData = [
    {
      title: "Startup",
      price: "$49",
      features: [
        "20 Startup Analyses",
        "Basic Investment Reports",
        "Market Opportunity Insights",
        "Email Support",
      ],
    },
    {
      title: "Professional",
      price: "$149",
      features: [
        "100 Startup Analyses",
        "Advanced VC Reports",
        "Competitive Intelligence",
        "Financial Projections",
        "Priority Support",
        "Export to PDF",
      ],
    },
    {
      title: "Enterprise",
      price: "$449",
      features: [
        "Unlimited Analyses",
        "White-label Reports",
        "API Access",
        "Custom Integrations",
        "Team Collaboration (5 users)",
        "Dedicated Account Manager",
        "Advanced Analytics Dashboard",
      ],
    },
  ];
  return (
    <div className="font-mono flex flex-col gap-8 items-center md:py-8">
      <div className="text-center">
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-sm text-orange-500 text-center"
        >
          PRICING
        </TextAnimate>
        <TextAnimate
          animation="slideUp"
          by="character"
          once
          className="md:text-3xl text-3xl text-black text-center"
        >
          Choose the plan that&apos;s right for you
        </TextAnimate>
      </div>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={` shadow-xl flex flex-col p-8 my-4 rounded-lg hover:scale-105 duration-300 border-1 border-gray-200 md:px-16`}
          >
            <h2 className="text-2xl font-bold text-center py-8">
              {card.title}
            </h2>
            <p className="text-center text-4xl font-bold">{card.price}</p>
            <div className="text-center font-medium">
              {card.features.map((feature, index) => (
                <p
                  key={index}
                  className={`py-2 border-b mx-8 ${index === 0 ? "mt-8" : ""}`}
                >
                  {feature}
                </p>
              ))}
            </div>
            <button
              className={`bg-orange-400 hover:text-orange-500 hover:bg-gray-50 duration-150 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3`}
            >
              Start Trial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PricingCards;
