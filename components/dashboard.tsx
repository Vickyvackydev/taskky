"use client";
import React, { useEffect, useState } from "react";
import Dashboardnav from "./dashboardnav";
import Sidebar from "./sidebar";
import { useMediaQuery } from "@/hooks";
import RightHero from "./rightHero";

type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  const isMobileView = useMediaQuery("(max-width: 640px)"); //state handling the size of the device screen
  const isTabletView = useMediaQuery("(max-width: 840px)"); //state handling the size of device screen
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [isRightSide, setIsRightSide] = useState(false);

  // take effect when the component mounts
  useEffect(() => {
    if (isMobileView) {
      setIsSideBarVisible(false);
      setIsRightSide(false);
    } else {
      setIsSideBarVisible(true);
      setIsRightSide(true);
    }
  }, [isMobileView]); // set the mobileview as its dependency

  return (
    <div className="lg:flex h-screen w-screen ">
      {isMobileView || isTabletView ? ( // overlay effect for only tablet and mobile screens
        <div
          onClick={() => {
            setIsSideBarVisible(false);
            setIsRightSide(false);
          }}
          className={`fixed top-0 left-0 bottom-0 w-full bg-gray-800/60 z-20  ${
            isSideBarVisible || isRightSide ? "" : "hidden"
          }`}
        ></div>
      ) : null}

      {/* side bar component */}
      <Sidebar
        isOpen={isSideBarVisible}
        onClose={() => setIsSideBarVisible(false)}
      />

      <div className="flex-1 ">
        {/* navigation bar for the dashboard */}
        <Dashboardnav
          isOpen={() => setIsSideBarVisible(true)}
          onClose={() => setIsSideBarVisible(false)}
          Open={() => setIsRightSide((prev: boolean) => !prev)}
          Close={() => setIsRightSide(false)}
          mobileView={isMobileView}
          isVisible={isSideBarVisible}
          isRightSide={isRightSide}
        />
        <div>{children}</div>
      </div>
      <div>
        {/* right segmant of the dashboard */}
        <RightHero rightSide={isRightSide} />
      </div>
    </div>
  );
};

export default Dashboard;
