import React from "react";

type SectionProps = {
  children: React.ReactNode;
  title?: string;
  backgroundColor?: string;
};

const Section = ({ children, title, backgroundColor }: SectionProps) => {
  return (
    <div
      className={`p-24px h-full w-full rounded-16px ${
        backgroundColor ? backgroundColor : ""
      }`}
    >
      {title ? (
        <h1 className="text-20px text-gray-400 mb-32px">{title}</h1>
      ) : null}
      <div>{children}</div>
    </div>
  );
};

export default Section;
