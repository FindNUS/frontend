import React, { useEffect, useState } from "react";
import FormField from "../../components/FormField";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { onChangeNumber, onChangeOTP } from "./loginSlice";
import firebase from "firebase/compat/app";
import GetOTPButton from "./GetOTPButton";
import VerifyOTPButton from "./VerifyOTPButton";

export type confirmationResultType =
  | firebase.auth.ConfirmationResult
  | undefined;

const LoginForm: React.FC = function () {
  const dispatch = useAppDispatch();
  const [confirmationResult, setConfirmationResult] =
    useState<confirmationResultType>(undefined);
  const state = useAppSelector((state) => state);

  useEffect(() => {
    console.log(confirmationResult);
    console.log(state);
  }, [confirmationResult, state]);

  // Handle form input change
  // Dispatch action to update input number in store
  const handleInputNumberChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeNumber(target.value));
  };

  // Dispatch action to update OTP in store
  const handleInputOTPChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeOTP(target.value));
  };

  return (
    <form className="login-form">
      <h3 className="login-form__header">Log In</h3>
      <div>
        <FormField
          labelContent="Phone Number"
          onChange={handleInputNumberChange}
        />
      </div>
      <div className="login-form__otp">
        <div>
          <FormField labelContent="Enter OTP" onChange={handleInputOTPChange} />
        </div>
        <GetOTPButton onGetOTP={setConfirmationResult} />
      </div>
      <div className="login-form__submit">
        <VerifyOTPButton
          confirmationResult={confirmationResult}
          setConfirmationResult={setConfirmationResult}
        />
      </div>
    </form>
  );
};

export default LoginForm;
