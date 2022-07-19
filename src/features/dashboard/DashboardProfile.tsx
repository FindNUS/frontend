import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../app/firebase";
import Button from "../../components/buttons/Button";
import PopupMessage, {
  PopupMessageStatus,
} from "../../components/PopupMessage";
import { ROUTE_HOME } from "../../constants";
import { useAppSelector } from "../../hooks";
import useFirebaseSendEmailVerification from "../../hooks/useFirebaseSendEmailVerification";
import { selectAuthIsFirstTime } from "../auth/authSlice";

const DashboardProfile: React.FC = function () {
  const { currentUser } = firebaseAuth;
  const navigate = useNavigate();
  const firstTimer = useAppSelector(selectAuthIsFirstTime);
  const [verifyEmailClicked, setVerifyEmailClicked] = useState(false);
  const [messageStatus, setMessageStatus] =
    useState<PopupMessageStatus>("warning");
  const [messageText, setMessageText] = useState("Email not verified!");

  // redirect user home if not logged in
  useEffect(() => {
    if (!currentUser) navigate(ROUTE_HOME);
    return;
  }, [currentUser]);

  const sendEmailVerification = useFirebaseSendEmailVerification();
  const handleVerifyEmail = () => {
    setMessageStatus("loading");
    setMessageText("Loading...");
    setVerifyEmailClicked(true);
    sendEmailVerification(currentUser as User);
    setMessageStatus("success");
    setMessageText("Verification email sent!");
  };

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
        <div className="dashboard-body__verify">
          <PopupMessage status={messageStatus} message={messageText} />
          <Button
            class={`btn btn--secondary ${
              verifyEmailClicked ? "btn--disabled" : ""
            }`}
            text="Send verification email"
            onClick={handleVerifyEmail}
          />
        </div>
      )}
    </section>
  );
};

export default DashboardProfile;
