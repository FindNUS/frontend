import React from "react";
import { getAuth } from "firebase/auth";

const DashboardProfile: React.FC = function () {
  const auth = getAuth();
  const { currentUser } = auth;
  return (
    <section className="dashboard-body">
      <span className="dashboard-body__message">
        This is a protected page. Only authenticated users can access this page
      </span>
      <span className="dashboard-body__message">
        You are currently logged in as: {currentUser?.phoneNumber}
      </span>
      <span className="dashboard-body__message">
        Your unique ID: {currentUser?.uid}
      </span>
    </section>
  );
};

export default DashboardProfile;
