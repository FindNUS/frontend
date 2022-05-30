import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectOTP, updateStatus, updateMessage } from "./loginSlice";
import { setToken } from "./authSlice";
import type { confirmationResultType, recaptchaType } from "./LoginForm";
import { clearAppVerifier } from "../../hooks/useFirebaseGetOTP";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { RecaptchaVerifier } from "firebase/auth";

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
    appVerifier: RecaptchaVerifier;
  };
  const navigate = useNavigate();

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

      // Validate OTP
      const res = await props.confirmationResult.confirm(inputOTP);

      // Update ID Token in auth slice
      const idToken = await firebase.auth().currentUser?.getIdToken();
      if (!idToken) throw new Error("Something went wrong");
      dispatch(setToken(idToken));

      // Successfully Logged In
      // Clear confirmation upon verification
      setConfirmationResult(undefined);

      dispatch(updateStatus("success"));
      dispatch(
        updateMessage(`Successfully logged in as ${res.user?.phoneNumber}`)
      );

      // Clear reCAPTCHA widget and destroy the current instance
      setAppVerifier(undefined);
      clearAppVerifier(appVerifier, recaptchaRef);

      // Redirect user to home page
      navigate("/");
    } catch (e) {
      // OTP Verification Error
      const error = e as Error;

      // Set error login state
      dispatch(updateStatus("error"));
      dispatch(updateMessage(error.message));

      // TODO: If OTP expired, allow user to request for another OTP
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
