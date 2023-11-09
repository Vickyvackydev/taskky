import React from "react";
import DashboardHero from "./dashboardHero";
import Sidebar from "./sidebar";
import Dashboardnav from "./dashboardnav";

type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  return (
    <div className="flex w-full">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <Dashboardnav />
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
