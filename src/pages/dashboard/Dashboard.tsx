import React from "react";
import Header from "../../components/header/Header";
import PageTitle from "../../components/PageTitle";
import DashboardNav from "./DashboardNav";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = function () {
  return (
    <div className="dashboard background background--main">
      <Header />
      <PageTitle title="Dashboard" />
      <div className="dashboard-contents">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
