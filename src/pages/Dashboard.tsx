import React from "react";
import { getAuth } from "firebase/auth";
import Header from "../components/header/Header";

const Dashboard: React.FC = function () {
  const auth = getAuth();
  const { currentUser } = auth;

  return (
    <div className="dashboard">
      <Header />
      <section className="dashboard-body">
        <h2 className="text-white-shadow">Dashboard</h2>
        <span className="dashboard-body__message">
          This is a protected page. Only authenticated users can access this
          page
        </span>
        <span className="dashboard-body__message">
          You are currently logged in as: {currentUser?.phoneNumber}
        </span>
        <span className="dashboard-body__message">
          Your unique ID: {currentUser?.uid}
        </span>
      </section>
    </div>
  );
};

export default Dashboard;
