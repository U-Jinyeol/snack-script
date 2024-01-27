import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="fixed z-50 inset-x-0 flex items-center p-4 h-60px bg-navy-700">
        <h1 className="text-green">SNACK SCRIPT</h1>
      </header>
    </>
  );
};

export default Header;
