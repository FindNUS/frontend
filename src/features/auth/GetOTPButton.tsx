import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectNumber,
  updateStatus,
  updateMessage,
  selectLoginStatus,
} from "./loginSlice";
import firebase from "firebase/compat/app";
import { confirmationResultType, recaptchaType } from "./LoginForm";

interface GetOTPButtonProps {
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<confirmationResultType>
  >;
  recaptchaRef: React.RefObject<HTMLDivElement>;
  setAppVerifier: React.Dispatch<React.SetStateAction<recaptchaType>>;
}

/**
 * Clear reCAPTCHA instance from the DOM and application, if it exists.
 * @param appVerifier The reCAPTCHA verifier instance.
 *  Set to undefined if to only re-render the ref element.
 * @param recaptchaRef Ref to the wrapper div for the reCAPTCHA element.
 */
const clearAppVerifier = (
  appVerifier: firebase.auth.RecaptchaVerifier | undefined,
  recaptchaRef: React.RefObject<HTMLDivElement>
) => {
  // Clear reCAPTCHA widget and destroy the current instance
  appVerifier && appVerifier.clear();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  recaptchaRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
};

const GetOTPButton: React.FC<GetOTPButtonProps> = function (
  props: GetOTPButtonProps
) {
  const { recaptchaRef, setConfirmationResult, setAppVerifier } = props;
  const dispatch = useAppDispatch();
  const inputNumber = useAppSelector(selectNumber);
  const loginStatus = useAppSelector(selectLoginStatus);

  // Clear reCAPTCHA verifier when not in use
  useEffect(() => {
    if (loginStatus === undefined || loginStatus === "error")
      clearAppVerifier(undefined, recaptchaRef);
  }, [loginStatus]);

  /**
   * Initialises the reCAPTCHA verifier instance.
   * @remarks Function must only be called after the document is loaded since
   *  the button must be in the DOM at the time of initialisation, otherwise
   *  it will result in firebase error (auth/argument-error).
   * @returns The reCAPTCHA verifier instance.
   */
  const setupAppVerifier = () => {
    const av = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
    setAppVerifier(av);
    return av;
  };

  /**
   * Request for OTP through firebase authentication.
   * @param ev The DOM event triggerred by a mouse click.
   * @returns The confirmation result is passed to the parent via
   *  the useState dispatch function. Confirmation result is required to
   *  verify if the OTP is valid using the confirm method.
   * @todo Validate if inputNumber conforms to E164 standard.
   */
  const handleGetOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    // Clear previous confirmation result, if any
    setConfirmationResult(undefined);
    // Re-render captcha container
    clearAppVerifier(undefined, recaptchaRef);

    const appVerifier = setupAppVerifier();

    try {
      // TODO: Validate number input
      if (inputNumber === "") {
        dispatch(updateStatus("error"));
        dispatch(updateMessage("Invalid phone number!"));
        return;
      }

      // Set loading login state
      dispatch(updateStatus("loading"));
      dispatch(updateMessage("Requesting for OTP..."));

      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(inputNumber, appVerifier);
      setConfirmationResult(confirmationResult);

      // Set success login state
      dispatch(updateStatus("success"));
      dispatch(updateMessage("Successfully requested for OTP"));
    } catch (e) {
      // Error; SMS not sent
      // Handle Errors Here
      const error = e as Error;

      // Set error login state
      dispatch(updateStatus("error"));
      dispatch(updateMessage(error.message));
      console.error(error.message);

      // Clear reCAPTCHA widget and destroy the current instance
      clearAppVerifier(appVerifier, recaptchaRef);
    }
  };

  return (
    <button
      className="btn btn--tertiary login-form__btn"
      onClick={handleGetOTP}
    >
      Get OTP
    </button>
  );
};

export default GetOTPButton;
