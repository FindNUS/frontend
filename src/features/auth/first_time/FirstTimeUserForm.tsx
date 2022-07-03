import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../../app/firebase";
import ButtonSubmit from "../../../components/buttons/ButtonSubmit";
import FormField from "../../../components/form/FormField";
import PopupMessage from "../../../components/PopupMessage";
import { REGEX_FIRST_NAME, ROUTE_HOME } from "../../../constants";

const FirstTimeUserForm: React.FC = function () {
  const [error, setError] = useState<string>();
  const [inputName, setInputName] = useState("");
  const user = firebaseAuth.currentUser;
  const navigate = useNavigate();

  const handleFirstNameChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setInputName(value.trim());
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    // check if invalid input
    if (!inputName.match(REGEX_FIRST_NAME))
      setError("Invalid input,.No numbers or special characters allowed.");
    else setError("");

    if (!user) return navigate(ROUTE_HOME);

    updateProfile(user, {
      displayName: inputName,
    });

    navigate(ROUTE_HOME);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__header">First time here?</h3>
      <p className="login-form__message">Help us get to know you better!</p>
      {error && <PopupMessage status="error" message={error} />}
      <FormField
        labelContent="First Name"
        onChange={handleFirstNameChange}
        disabled={false}
      />
      <div className="login-form__submit">
        <ButtonSubmit className="btn btn--tertiary" text="Submit" />
      </div>
    </form>
  );
};

export default FirstTimeUserForm;
