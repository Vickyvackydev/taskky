import React from "react";

const Skeleton = () => {
  // skeleton loader
  return (
    <div className="lg:flex justify-between gap-4 grid grid-col-2">
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4 w-36 dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4 w-36 dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4 w-36 dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
      </div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4 w-36 dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
        <div className="skeleton h-4  w-[10rem] dark:bg-bg_black"></div>
      </div>
    </div>
  );
};

export default Skeleton;
// end..
