import React from "react";
import Header from "../components/header/Header";
import LoginForm from "../features/auth/LoginForm";

const Login: React.FC = function () {
  return (
    <div className="login">
      <Header />
      <section className="login__container">
        <div className="login__message">
          <h1 className="text-white-shadow">Welcome</h1>
        </div>
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
