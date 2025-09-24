// PricingCards.js file
import React from "react";
import { TextAnimate } from "../ui/text-animate";

const PricingCards = () => {
  const cardData = [
    {
      image: "https://i.imgur.com/Ql4jRdB.png",
      title: "Single User",
      price: "$149",
      features: ["500 GB Storage", "1 Granted User", "Send up to 2 GB"],
    },
    {
      image: "https://i.imgur.com/pJNFEHR.png",
      title: "Double User",
      price: "$149",
      features: ["500 GB Storage", "1 Granted User", "Send up to 2 GB"],
    },
    {
      image: "https://i.imgur.com/Hg0sUJP.png",
      title: "Triple User",
      price: "$149",
      features: ["500 GB Storage", "1 Granted User", "Send up to 2 GB"],
    },
  ];
  return (
    <div className="font-mono flex flex-col gap-8 items-center">
      <TextAnimate
        animation="slideUp"
        by="character"
        once
        className="md:text-lg font-medium  text-orange-500 text-center"
      >
        PRICING
      </TextAnimate>
      <TextAnimate
        animation="slideUp"
        by="character"
        once
        className="md:text-3xl text-3xl text-black text-center"
      >
        Choose the plan that's right for you
      </TextAnimate>
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
