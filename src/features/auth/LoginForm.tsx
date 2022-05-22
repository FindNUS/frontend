import React, { useState } from "react";
import FormField from "../../components/FormField";
import { useAppDispatch } from "../../app/hooks";
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

  // Handle form input change
  /**
   * Update input phone number in the store
   * Dispatches the onChangeNumber action
   * @param ev The DOM event triggerred by an input element change
   */
  const handleInputNumberChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeNumber(target.value));
  };

  /**
   * Update input OTP in the store
   * Dispatches the onChangeOTP action
   * @param ev The DOM event triggerred by an input element change
   */
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
