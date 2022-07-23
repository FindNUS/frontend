import React from "react";
import findnusLogo from "../assets/img/Logo_White_Red.png";
import { Link } from "react-router-dom";
import { ROUTE_HOME } from "../constants";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = function (props: LogoProps) {
  return (
    <Link to={ROUTE_HOME} className={props.className} data-testid="logo-link">
      <img src={findnusLogo} className="logo" alt="FindNUS Logo" />
    </Link>
  );
};

export default Logo;
