import React from "react";

const SideBar = () => {
  return (
    <React.Fragment>
      <aside>
        <div className="fixed z-49 top-60px inset-0 w-220px min-h-screen p-2 bg-navy-300">
          <h1 className="text-40px dark:(text-white)">SIDE BAR</h1>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default SideBar;
