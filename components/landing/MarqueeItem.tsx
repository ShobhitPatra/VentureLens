import React from "react";

export interface MarqueeItemProps {
  heading?: string;
  description?: string;
}
const MarqueeItem: React.FC<MarqueeItemProps> = ({
  heading,
  description,
}: MarqueeItemProps) => {
  return <div className="text-gray-600">{heading}</div>;
};

export default MarqueeItem;
