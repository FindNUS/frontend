import React from "react";
import findnusLogo from "../img/Logo_White_Red.png";
import { Link } from "react-router-dom";

const Logo: React.FC = function () {
  return (
    <Link to="/">
      <img src={findnusLogo} className="logo" alt="FindNUS Logo" />
    </Link>
  );
};

export default Logo;
