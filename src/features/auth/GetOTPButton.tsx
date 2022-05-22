import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectNumber } from "./loginSlice";
import firebase from "firebase/compat/app";
import type { confirmationResultType } from "./LoginForm";

const BUTTON_ID_GET_OTP = "button-get-otp";

interface GetOTPButtonProps {
  onGetOTP: React.Dispatch<React.SetStateAction<confirmationResultType>>;
}

const GetOTPButton: React.FC<GetOTPButtonProps> = function (
  props: GetOTPButtonProps
) {
  const inputNumber = useAppSelector(selectNumber);

  /**
   * Initialises the reCAPTCHA verifier instance
   * @remarks Function must only be called after the document is loaded since
   *  the button must be in the DOM at the time of initialisation, otherwise
   *  it will result in firebase error (auth/argument-error)
   * @returns The reCAPTCHA verifier instance
   */
  const setupAppVerifier = () =>
    new firebase.auth.RecaptchaVerifier(BUTTON_ID_GET_OTP, {
      size: "invisible",
    });

  /**
   * Request for OTP through firebase authentication
   * @param ev The DOM event triggerred by a mouse click
   * @todo Implement error handling with try-catch
   * @returns The confirmation result is passed to the parent via
   *  the useState dispatch function. Confirmation result is required to
   *  verify if the OTP is valid using the confirm method
   */
  const handleGetOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const appVerifier = setupAppVerifier();
    const confirmationResult = await firebase
      .auth()
      .signInWithPhoneNumber(inputNumber, appVerifier);
    console.log("Requested for OTP");
    props.onGetOTP(confirmationResult);
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
