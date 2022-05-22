import React from "react";
import FormField from "../../components/FormField";
import { useAppDispatch } from "../../app/hooks";
import { onChangeNumber, onChangeOTP } from "./loginSlice";
import GetOTPButton from "./GetOTPButton";

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
        <GetOTPButton />
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
