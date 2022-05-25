import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectOTP, updateStatus, updateMessage } from "./loginSlice";
import type { confirmationResultType, recaptchaType } from "./LoginForm";
import firebase from "firebase/compat/app";
import { clearAppVerifier } from "./GetOTPButton";

interface VerifyOTPButtonProps {
  confirmationResult: confirmationResultType;
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<confirmationResultType>
  >;
  recaptchaRef: React.RefObject<HTMLDivElement>;
  appVerifier: recaptchaType;
  setAppVerifier: React.Dispatch<React.SetStateAction<recaptchaType>>;
}

const VerifyOTPButton: React.FC<VerifyOTPButtonProps> = function (
  props: VerifyOTPButtonProps
) {
  const inputOTP = useAppSelector(selectOTP);
  const dispatch = useAppDispatch();
  const { setAppVerifier, setConfirmationResult, recaptchaRef } = props;
  const { appVerifier } = props as {
    appVerifier: firebase.auth.RecaptchaVerifier;
  };

  /**
   * Verifies OTP input by the user.
   * User must get OTP before they are allowed to verify OTP.
   *
   * @param ev The DOM event triggerred by a mouse click.
   * @returns
   * @todo Store returned user credentials.
   * @todo Handle caught errors.
   */
  const handleVerifyOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    // Check if user has requested for OTP
    if (!props.confirmationResult) {
      dispatch(updateStatus("error"));
      dispatch(updateMessage("Request for OTP first!"));
      return;
    }

    try {
      ev.preventDefault();

      // Set loading login state
      dispatch(updateStatus("loading"));
      dispatch(updateMessage("Verifying OTP..."));

      // TODO: Handle returned firebase.auth.UserCredential
      const res = await props.confirmationResult.confirm(inputOTP);
      console.log(res);
      // TODO: Check if wrong OTP results in error thrown

      // Successfully Logged In
      // Clear confirmation upon verification
      setConfirmationResult(undefined);

      dispatch(updateStatus("success"));
      dispatch(
        updateMessage(
          `Successfully logged in as ${
            res.user?.phoneNumber
          }: ${res.user?.getIdToken()}`
        )
      );

      // Clear reCAPTCHA widget and destroy the current instance
      setAppVerifier(undefined);
      clearAppVerifier(appVerifier, recaptchaRef);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  };

  return (
    <button
      type="submit"
      className="btn btn--secondary"
      onClick={handleVerifyOTP}
      disabled={!props.confirmationResult}
    >
      Verify OTP
    </button>
  );
};

export default VerifyOTPButton;
