import React from "react";
import findnusLogo from "../assets/img/Logo_White_Red.png";
import { Link } from "react-router-dom";
import { ROUTE_HOME } from "../constants";

const Logo: React.FC = function () {
  return (
    <Link to={ROUTE_HOME}>
      <img src={findnusLogo} className="logo" alt="FindNUS Logo" />
    </Link>
  );
};

export default Logo;
