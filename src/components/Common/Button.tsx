import React from "react";

type CommonButtonProps = {
  type: "submit" | "button" | "reset";
  label: string;
  onClick?: () => void;
  className?: string;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  type,
  label,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-gray-500 text-white py-2 px-4 hover:bg-green-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default CommonButton;
