import React from "react";
import Logo from "../Logo";
import NavItem from "./NavItem";
import { useAppSelector } from "../../hooks";
import { selectAuthIsLoggedIn } from "../../features/auth/authSlice";

const Header: React.FC = function () {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <ul className="nav__list">
          <NavItem to="/" text="Home" />
          <NavItem to="/" text="Lost an item" />
          <NavItem to="/" text="Found an item" />
          {!isLoggedIn && <NavItem to="/login" text="Login" />}
          {isLoggedIn && <NavItem to="/" text="Dashboard" />}
          {isLoggedIn && <NavItem text="Logout" />}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
