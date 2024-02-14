import { DEFAULT } from "@/constant";
import React from "react";

const EmptyImage: React.FC = () => {
  return (
    <img
      src={DEFAULT.IMAGE.EMPTY}
      alt="empty-thumbnail"
      className="object-cover w-full h-full"
    />
  );
};

export default EmptyImage;
