import React from "react";

const navlinks = [
  {
    link: "home",
    href: "",
  },
  {
    link: "home",
    href: "",
  },
  {
    link: "home",
    href: "",
  },
];
const Dashboardnav = () => {
  return (
    <nav className="  border-b-2 w-full p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-10">
          {navlinks.map((item) => (
            <span>{item.link}</span>
          ))}
        </div>
        <div>
          <input type="text" className="w-[30rem] border ml-16" />
        </div>
        <div className="float-right">3</div>
      </div>
    </nav>
  );
};

export default Dashboardnav;
