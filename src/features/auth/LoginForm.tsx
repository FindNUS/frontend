import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectLoginStatus, selectLoginMessage } from "./loginSlice";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import PopupMessage from "../../components/PopupMessage";
import { RECAPTCHA_CONTAINER_ELEMENT } from "../../constants";
import GetOTPForm from "./get_otp/GetOTPForm";
import VerifyOTPForm from "./verify_otp/VerifyOTPForm";
import { setAuthVerificationId } from "./authSlice";

export type recaptchaType = RecaptchaVerifier | undefined;

export type confirmationResultType = ConfirmationResult | undefined;

const LoginForm: React.FC = function () {
  const [confirmationResult, setConfirmationResult] =
    useState<confirmationResultType>(undefined);
  const loginStatus = useAppSelector(selectLoginStatus);
  const loginMessage = useAppSelector(selectLoginMessage);
  const [appVerifier, setAppVerifier] = useState<recaptchaType>(undefined);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!confirmationResult) return;
    dispatch(setAuthVerificationId(confirmationResult.verificationId));
  }, [confirmationResult]);

  const getOTPProps = {
    setAppVerifier,
    setConfirmationResult,
    recaptchaRef: recaptchaWrapperRef,
  };

  const verifyOTPProps = {
    ...getOTPProps,
    appVerifier,
    confirmationResult,
  };

  return (
    <div className="login-form">
      <h3 className="login-form__header">Log In</h3>
      {loginStatus && (
        <PopupMessage status={loginStatus} message={loginMessage} />
      )}

      {!confirmationResult && <GetOTPForm {...getOTPProps} />}
      {confirmationResult && <VerifyOTPForm {...verifyOTPProps} />}
      <div ref={recaptchaWrapperRef}>{RECAPTCHA_CONTAINER_ELEMENT}</div>
    </div>
  );
};

export default LoginForm;
