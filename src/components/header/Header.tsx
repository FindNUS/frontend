import React from "react";
import Logo from "../Logo";
import NavItem from "./NavItem";
import { useAppSelector } from "../../hooks";
import { selectAuthIsLoggedIn } from "../../features/auth/authSlice";
import useFirebaseLogout from "../../hooks/useFirebaseLogout";

interface HeaderProps {
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = function (props: HeaderProps) {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
  const logout = useFirebaseLogout();

  switch (props.isHomePage) {
    case true:
      return (
        <header className="header">
          <Logo />
          <nav className="nav">
            <ul className="nav__list">
              {!isLoggedIn && <NavItem to="/login" text="Login" />}
              {isLoggedIn && <NavItem to="/dashboard" text="Dashboard" />}
              {isLoggedIn && <NavItem text="Logout" onClick={logout} />}
            </ul>
          </nav>
        </header>
      );
    case false:
      return (
        <header className="header">
          <Logo />
          <nav className="nav">
            <ul className="nav__list">
              <NavItem to="/" text="Home" />
              <NavItem to="/" text="Lost an item" />
              <NavItem to="/" text="Found an item" />
              {!isLoggedIn && <NavItem to="/login" text="Login" />}
              {isLoggedIn && <NavItem to="/dashboard" text="Dashboard" />}
              {isLoggedIn && <NavItem text="Logout" onClick={logout} />}
            </ul>
          </nav>
        </header>
      );
  }
};

export default Header;
