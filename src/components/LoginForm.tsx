import React from "react";
import FormField from "./FormField";
import { useAppDispatch } from "../app/hooks";
import { onChangeNumber, onChangeOTP } from "../app/slices/login-slice";

const LoginForm: React.FC = function () {
  const dispatch = useAppDispatch();

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

  // User verification
  const handleGetOTP = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    // TODO
  };

  const handleVerifyOTP = (ev: React.MouseEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // TODO
  };

  return (
    <form className="login-form" onSubmit={handleVerifyOTP}>
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
        <button
          className="btn btn--tertiary login-form__btn"
          onClick={handleGetOTP}
        >
          Get OTP
        </button>
      </div>
      <div className="login-form__submit">
        <button type="submit" className="btn btn--secondary">
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
