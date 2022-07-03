import React from "react";
import Header from "../components/header/Header";
import PageTitle from "../components/PageTitle";
import DashboardNav from "../features/dashboard/DashboardNav";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";

const Dashboard: React.FC = function () {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <div className="dashboard background background--main">
      <Header isLoggedIn={isLoggedIn} />
      <PageTitle title="Dashboard" />
      <div className="dashboard-contents">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
