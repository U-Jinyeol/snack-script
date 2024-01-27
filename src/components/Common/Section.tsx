import React from "react";

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="p-60px h-full w-full">
      <h1 className="font-bold text-40px">{title}</h1>
      <div className="mt-60px">{children}</div>
    </div>
  );
};

export default Section;
