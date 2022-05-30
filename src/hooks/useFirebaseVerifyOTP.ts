import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setToken } from "../features/auth/authSlice";
import {
  confirmationResultType,
  recaptchaType,
} from "../features/auth/LoginForm";
import { updateMessage, updateStatus } from "../features/auth/loginSlice";
import { useAppDispatch } from "./reduxHooks";
import { clearAppVerifier, useFirebaseGetOTPProps } from "./useFirebaseGetOTP";

export interface useFirebaseVerifyOTPProps extends useFirebaseGetOTPProps {
  appVerifier: recaptchaType;
  confirmationResult: confirmationResultType;
}

/**
 * The confirmation result is cleared upon successful verification of OTP.
 * Firebase automatically updates its auth state in redux
 *
 * @param props Methods to update confirmationResult and appVerifier state,
 * the ref to the recaptcha element, and the recaptcha verifier and
 * confirmation result state.
 * @returns
 * @todo BUG: Confirmation result is also cleared when OTP verification fails.
 */
const useFirebaseVerifyOTP = (props: useFirebaseVerifyOTPProps) => {
  const dispatch = useAppDispatch();
  const {
    setAppVerifier,
    setConfirmationResult,
    recaptchaRef,
    appVerifier,
    confirmationResult,
  } = props;

  const auth = getAuth();
  const navigate = useNavigate();

  return async (receivedOTP: string) => {
    // Check if user has requested for OTP
    if (!confirmationResult) {
      dispatch(updateStatus("error"));
      dispatch(updateMessage("Request for OTP first!"));
      return;
    }

    try {
      // Set loading login state
      dispatch(updateStatus("loading"));
      dispatch(updateMessage("Verifying OTP..."));

      // Validate OTP
      const res = await confirmationResult.confirm(receivedOTP);

      // Update ID Token in auth slice
      const idToken = await auth.currentUser?.getIdToken();
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
};

export default useFirebaseVerifyOTP;
