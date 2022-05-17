import React from "react";
import FormField from "./FormField";

const LoginForm: React.FC = function () {
  return (
    <form className="login-form">
      <h3 className="login-form__header">Log In</h3>
      <div>
        <FormField labelContent="Phone Number" />
      </div>
      <div className="login-form__otp">
        <div>
          <FormField labelContent="Enter OTP" />
        </div>
        <button className="btn btn--tertiary login-form__btn">Get OTP</button>
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
