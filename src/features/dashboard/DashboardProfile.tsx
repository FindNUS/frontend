import React from "react";
import { getAuth } from "firebase/auth";

const DashboardProfile: React.FC = function () {
  const auth = getAuth();
  const { currentUser } = auth;
  return (
    <section className="dashboard-body">
      {currentUser?.metadata.lastSignInTime && (
        <div className="dashboard-body__message">
          <span className="dashboard-body__message--descriptor">
            Last logged in at:&nbsp;
          </span>
          {currentUser?.metadata.lastSignInTime}
        </div>
      )}
      <div className="dashboard-body__message">
        <span className="dashboard-body__message--descriptor">
          Currently logged in as:&nbsp;
        </span>
        {currentUser?.phoneNumber}
      </div>
      {currentUser?.displayName && (
        <div className="dashboard-body__message">
          <span className="dashboard-body__message--descriptor">
            Name:&nbsp;
          </span>
          {currentUser?.displayName}
        </div>
      )}
      {currentUser?.email && (
        <div className="dashboard-body__message">
          <span className="dashboard-body__message--descriptor">
            Email:&nbsp;
          </span>
          {currentUser?.email}
        </div>
      )}
      <div className="dashboard-body__message">
        <span className="dashboard-body__message--descriptor">
          Unique ID:&nbsp;
        </span>
        {currentUser?.uid}
      </div>
    </section>
  );
};

export default DashboardProfile;
