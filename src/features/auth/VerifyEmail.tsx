import { User } from "firebase/auth";
import React, { useState } from "react";
import Button from "../../components/buttons/Button";
import PopupMessage, {
  PopupMessageStatus,
} from "../../components/PopupMessage";
import useFirebaseSendEmailVerification from "../../hooks/useFirebaseSendEmailVerification";

interface VerifyEmailProps {
  user: User;
}

const VerifyEmail: React.FC<VerifyEmailProps> = function (
  props: VerifyEmailProps
) {
  const { user } = props;
  const [clicked, setClicked] = useState(false);
  const [messageStatus, setMessageStatus] =
    useState<PopupMessageStatus>("warning");
  const [messageText, setMessageText] = useState("Email not verified!");
  const sendEmailVerification = useFirebaseSendEmailVerification();

  const handleVerifyEmail = () => {
    setMessageStatus("loading");
    setMessageText("Loading...");
    setClicked(true);
    sendEmailVerification(user);
    setMessageStatus("success");
    setMessageText(
      "Verification email sent! Please login again after verifying"
    );
  };

  return (
    <div className="verify-email dashboard-body__verify">
      <PopupMessage status={messageStatus} message={messageText} />
      <Button
        class={`btn btn--secondary ${clicked ? "btn--disabled" : ""}`}
        text="Verify email"
        onClick={handleVerifyEmail}
      />
    </div>
  );
};

export default VerifyEmail;
