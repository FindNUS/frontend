import React, { useEffect } from "react";
import { RecaptchaVerifier, Auth, signInWithPhoneNumber } from "firebase/auth";
import {
  confirmationResultType,
  recaptchaType,
} from "../features/auth/LoginForm";
import {
  selectLastRequested,
  selectLoginStatus,
  setLastRequested,
  updateMessage,
  updateStatus,
} from "../features/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  OTP_REQUEST_TIMEOUT,
  RECAPTCHA_CONTAINER_ELEMENT,
  RECAPTCHA_CONTAINER_ID,
} from "../constants";
import { firebaseAuth } from "../app/firebase";

export type setAppVerifierType = React.Dispatch<
  React.SetStateAction<recaptchaType>
>;

export interface useFirebaseGetOTPProps {
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<confirmationResultType>
  >;
  setAppVerifier: setAppVerifierType;
  recaptchaRef: React.RefObject<HTMLDivElement>;
}

/** Initialises the reCAPTCHA verifier instance.
 * @remarks Function must only be called after the document is loaded since
 *  the button must be in the DOM at the time of initialisation, otherwise
 *  it will result in firebase error (auth/argument-error).
 * @returns The reCAPTCHA verifier instance.
 */
export const setupAppVerifier = (auth: Auth, setAV: setAppVerifierType) => {
  const av = new RecaptchaVerifier(
    RECAPTCHA_CONTAINER_ID,
    {
      size: "invisible",
    },
    auth
  );
  setAV(av);
  return av;
};

/**
 * Clear reCAPTCHA instance from the DOM and application, if it exists.
 * @param appVerifier The reCAPTCHA verifier instance.
 *  Set to undefined if to only re-render the ref element.
 * @param recaptchaRef Ref to the wrapper div for the reCAPTCHA element.
 */
export const clearAppVerifier = (
  appVerifier: RecaptchaVerifier | undefined,
  recaptchaRef: React.RefObject<HTMLDivElement>
) => {
  // Clear reCAPTCHA widget and destroy the current instance
  appVerifier && appVerifier.clear();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  recaptchaRef.current.innerHTML = RECAPTCHA_CONTAINER_ELEMENT;
};

/**
 * Generate the method to request for OTP from firebase.
 *
 * The confirmation result is passed to the parent via
 * the useState dispatch method. Confirmation result is required to
 * verify if the OTP is valid using the confirm method.
 *
 * @param props Methods to update confirmationResult and appVerifier state,
 * and the ref to the recaptcha element
 * @returns Method for requesting for OTP, requires 1 argument (phone number).
 * @todo Validate if inputNumber conforms to E164 standard.
 */
const useFirebaseGetOTP = (props: useFirebaseGetOTPProps) => {
  const { setConfirmationResult, setAppVerifier, recaptchaRef } = props;
  const dispatch = useAppDispatch();
  const lastRequested = useAppSelector(selectLastRequested);
  const loginStatus = useAppSelector(selectLoginStatus);

  // Clear reCAPTCHA verifier when not in use
  useEffect(() => {
    if (loginStatus === undefined || loginStatus === "error")
      clearAppVerifier(undefined, recaptchaRef);
  }, [loginStatus]);

  const getOTPFromFirebase = async (phoneNumber: string) => {
    // Clear previous confirmation result, if any
    setConfirmationResult(undefined);
    // Re-render captcha container
    clearAppVerifier(undefined, recaptchaRef);

    const appVerifier = setupAppVerifier(firebaseAuth, setAppVerifier);

    try {
      // TODO: Validate number input
      if (phoneNumber === "") {
        dispatch(updateStatus("error"));
        dispatch(updateMessage("Invalid phone number!"));
        return;
      }

      // Set OTP last requested time to now (when button is clicked)
      const now = new Date().getTime();
      !lastRequested && dispatch(setLastRequested(now));

      // Check if insuffidient time has passed
      if (lastRequested) {
        const timeNow = new Date().getTime();
        const timeRemaining = Math.round(
          (OTP_REQUEST_TIMEOUT - (timeNow - lastRequested)) / 1000
        );

        dispatch(updateStatus("warning"));
        dispatch(
          updateMessage(
            `Wait ${timeRemaining} seconds before requesting for another OTP!`
          )
        );
        return;
      }

      // Clear last request time after timeout
      setTimeout(() => {
        dispatch(setLastRequested(undefined));
        dispatch(updateStatus(undefined));
      }, OTP_REQUEST_TIMEOUT);

      // Set loading login state
      dispatch(updateStatus("loading"));
      dispatch(updateMessage("Requesting for OTP..."));

      const confirmationResult = await signInWithPhoneNumber(
        firebaseAuth,
        phoneNumber,
        appVerifier
      );
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

      // Clear reCAPTCHA widget and destroy the current instance
      clearAppVerifier(appVerifier, recaptchaRef);

      // No OTP requested, allow user to request for another
      dispatch(setLastRequested(undefined));
    }
  };

  return getOTPFromFirebase;
};

export default useFirebaseGetOTP;
