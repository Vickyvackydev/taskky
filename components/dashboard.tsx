"use client";
import React, { useEffect, useState } from "react";

import Dashboardnav from "./dashboardnav";
import SidebarLg from "./sidebarLg";
import { useMediaQuery } from "@/hooks";
import RightHero from "./rightHero";

type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  const isMobileView = useMediaQuery("(max-width: 640px)");
  const isTabletView = useMediaQuery("(max-width: 840px)");

  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [isRightSide, setIsRightSide] = useState(false);

  useEffect(() => {
    if (isMobileView) {
      setIsSideBarVisible(false);
      setIsRightSide(false);
    } else {
      setIsSideBarVisible(true);
      setIsRightSide(true);
    }
  }, [isMobileView]);
  return (
    <div className="lg:flex h-screen w-screen">
      {isMobileView || isTabletView ? (
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

      <SidebarLg
        isOpen={isSideBarVisible}
        onClose={() => setIsSideBarVisible(false)}
      />

      <div className="flex-1 ">
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
        <RightHero rightSide={isRightSide} />
      </div>
    </div>
  );
};

export default Dashboard;
