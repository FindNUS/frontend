import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../app/firebase";
import { ROUTE_HOME } from "../../constants";
import { useAppSelector } from "../../hooks";
import { selectAuthIsFirstTime } from "../auth/authSlice";
import VerifyEmail from "../auth/VerifyEmail";

const DashboardProfile: React.FC = function () {
  const { currentUser } = firebaseAuth;
  const navigate = useNavigate();
  const firstTimer = useAppSelector(selectAuthIsFirstTime);

  // redirect user home if not logged in
  useEffect(() => {
    if (!currentUser) navigate(ROUTE_HOME);
    return;
  }, [currentUser]);

  return (
    <section className="dashboard-body">
      {currentUser?.metadata.lastSignInTime && (
        <div className="dashboard-body__message">
          <span className="dashboard-body__message--descriptor">
            Last&nbsp;logged&nbsp;in&nbsp;at:&ensp;
          </span>
          {currentUser?.metadata.lastSignInTime}
        </div>
      )}
      <div className="dashboard-body__message">
        <span className="dashboard-body__message--descriptor">
          Currently&nbsp;logged&nbsp;in&nbsp;as:&ensp;
        </span>
        {currentUser?.phoneNumber}
      </div>
      {currentUser?.displayName && (
        <div className="dashboard-body__message">
          <span className="dashboard-body__message--descriptor">
            Name:&ensp;
          </span>
          {currentUser?.displayName}
        </div>
      )}
      {currentUser?.email && (
        <div className="dashboard-body__message">
          <span className="dashboard-body__message--descriptor">
            Email:&ensp;
          </span>
          {currentUser?.email}
          {!currentUser.emailVerified && " (not verified)"}
        </div>
      )}
      <div className="dashboard-body__message">
        <span className="dashboard-body__message--descriptor">
          Unique&nbsp;ID:&ensp;
        </span>
        {currentUser?.uid}
      </div>
      {!firstTimer && !currentUser?.emailVerified && (
        <VerifyEmail user={currentUser as User} />
      )}
    </section>
  );
};

export default DashboardProfile;
