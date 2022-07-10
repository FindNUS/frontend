import { updateEmail, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../../app/firebase";
import ButtonSubmit from "../../../components/buttons/ButtonSubmit";
import FormField from "../../../components/form/FormField";
import PopupMessage, {
  PopupMessageStatus,
} from "../../../components/PopupMessage";
import { REGEX_EMAIL, REGEX_FIRST_NAME, ROUTE_HOME } from "../../../constants";
import useFirebaseSendEmailVerification from "../../../hooks/useFirebaseSendEmailVerification";

const FirstTimeUserForm: React.FC = function () {
  const [messageStatus, setMessageStatus] = useState<PopupMessageStatus>();
  const [messageText, setMessageText] = useState<string>();
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const user = firebaseAuth.currentUser;
  const navigate = useNavigate();
  const sendEmailVerification = useFirebaseSendEmailVerification();

  // check if user is logged in
  useEffect(() => {
    if (user) return;
    navigate(ROUTE_HOME);
  }, [user]);

  const handleFirstNameChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setInputName(value.trim());
  };

  const handleEmailChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setInputEmail(value.trim());
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      setMessageStatus("loading");
      setMessageText("Loading...");

      // check if invalid input
      if (
        !inputName ||
        inputName === "" ||
        !inputName.match(REGEX_FIRST_NAME)
      ) {
        // invalid name
        throw new Error(
          "Invalid input. No numbers or special characters allowed."
        );
      } else if (
        !inputEmail ||
        inputEmail === "" ||
        !inputEmail.match(REGEX_EMAIL)
      ) {
        // invalid email
        throw new Error("Invalid email.");
      } else {
        setMessageStatus("loading");
        setMessageText("Loading...");
      }

      if (!user) return navigate(ROUTE_HOME);

      await updateEmail(user, inputEmail);
      sendEmailVerification(user);
      updateProfile(user, {
        displayName: inputName,
      });

      setMessageStatus("success");
      setMessageText("Verification email sent!");

      // sleep, allow user to read message
      await new Promise((resolve) => setTimeout(resolve, 1200));

      navigate(ROUTE_HOME);
    } catch (err) {
      setMessageStatus("error");
      setMessageText((err as Error).message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__header">First time here?</h3>
      <p className="login-form__message">Help us get to know you better!</p>
      {messageStatus && messageText && (
        <PopupMessage status={messageStatus} message={messageText} />
      )}
      <FormField
        labelContent="First Name"
        onChange={handleFirstNameChange}
        disabled={false}
      />
      <FormField
        labelContent="E-mail"
        onChange={handleEmailChange}
        disabled={false}
      />
      <div className="login-form__submit">
        <ButtonSubmit className="btn btn--tertiary" text="Submit" />
      </div>
    </form>
  );
};

export default FirstTimeUserForm;
