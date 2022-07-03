import React from "react";
import Header from "../components/header/Header";
import { useAppSelector } from "../hooks";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";
import { Outlet } from "react-router-dom";

const Login: React.FC = function () {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <div className="login background background--main">
      <Header isLoggedIn={isLoggedIn} />
      <section className="login__container">
        <div className="login__message">
          <h1 className="text-white-shadow">Welcome</h1>
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default Login;
