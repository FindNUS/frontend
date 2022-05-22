import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setConfirmationResult, selectNumber } from "./loginSlice";
import firebase from "firebase/compat/app";

const BUTTON_ID_GET_OTP = "button-get-otp";

const GetOTPButton: React.FC = function () {
  const dispatch = useAppDispatch();
  const inputNumber = useAppSelector(selectNumber);
  // RecaptchaVerifier is not initialised at run time
  // since the button must be in the DOM at the time of initialisation
  const setupAppVerifier = () =>
    new firebase.auth.RecaptchaVerifier(BUTTON_ID_GET_OTP, {
      size: "invisible",
    });

  const handleGetOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const appVerifier = setupAppVerifier();
    const confirmationResult = await firebase
      .auth()
      .signInWithPhoneNumber(inputNumber, appVerifier);
    console.log("Requested for OTP");
    dispatch(setConfirmationResult(confirmationResult));
  };

  return (
    <button
      className="btn btn--tertiary login-form__btn"
      id={BUTTON_ID_GET_OTP}
      onClick={handleGetOTP}
    >
      Get OTP
    </button>
  );
};

export default GetOTPButton;
