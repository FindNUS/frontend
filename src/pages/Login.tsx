import React from "react";
import Header from "../components/header/Header";
import LoginForm from "../features/auth/LoginForm";

const Login: React.FC = function () {
  return (
    <div className="login">
      <Header />
      <div className="login__container">
        <div className="login__message">
          <h1>Welcome</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
