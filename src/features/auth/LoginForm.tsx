import React, { useState, useRef } from "react";
import FormField from "../../components/FormField";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  onChangeNumber,
  onChangeOTP,
  selectLoginStatus,
  selectLoginMessage,
} from "./loginSlice";
import firebase from "firebase/compat/app";
import GetOTPButton from "./GetOTPButton";
import VerifyOTPButton from "./VerifyOTPButton";
import PopupMessage from "../../components/PopupMessage";

export type recaptchaType = firebase.auth.RecaptchaVerifier | undefined;

export type confirmationResultType =
  | firebase.auth.ConfirmationResult
  | undefined;

export type LoginStatus =
  | "success"
  | "warning"
  | "error"
  | "loading"
  | undefined;

const LoginForm: React.FC = function () {
  const dispatch = useAppDispatch();
  const [confirmationResult, setConfirmationResult] =
    useState<confirmationResultType>(undefined);
  const loginStatus = useAppSelector(selectLoginStatus);
  const loginMessage = useAppSelector(selectLoginMessage);
  const [appVerifier, setAppVerifier] = useState<recaptchaType>(undefined);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);

  // Handle form input change
  /**
   * Update input phone number in the store.
   * Dispatches the onChangeNumber action.
   * @param ev The DOM event triggerred by an input element change
   */
  const handleInputNumberChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeNumber(target.value));
  };

  /**
   * Update input OTP in the store.
   * Dispatches the onChangeOTP action.
   * @param ev The DOM event triggerred by an input element change.
   */
  const handleInputOTPChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeOTP(target.value));
  };

  return (
    <form className="login-form">
      <h3 className="login-form__header">Log In</h3>
      {loginStatus && (
        <PopupMessage status={loginStatus} message={loginMessage} />
      )}
      <div className="form-field">
        <FormField
          labelContent="Phone Number"
          onChange={handleInputNumberChange}
          disabled={false}
        />
      </div>
      <div className="login-form__otp">
        <div className="form-field">
          <FormField
            labelContent="Enter OTP"
            onChange={handleInputOTPChange}
            disabled={!confirmationResult}
          />
        </div>
        <GetOTPButton
          setConfirmationResult={setConfirmationResult}
          recaptchaRef={recaptchaWrapperRef}
          setAppVerifier={setAppVerifier}
        />
      </div>
      <div className="login-form__submit">
        <VerifyOTPButton
          confirmationResult={confirmationResult}
          setConfirmationResult={setConfirmationResult}
          recaptchaRef={recaptchaWrapperRef}
          appVerifier={appVerifier}
          setAppVerifier={setAppVerifier}
        />
      </div>
      <div ref={recaptchaWrapperRef}>
        <div id="recaptcha-container"></div>
      </div>
    </form>
  );
};

export default LoginForm;
