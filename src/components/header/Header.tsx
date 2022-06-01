import React from "react";
import Logo from "../Logo";
import NavItem from "./NavItem";
import { useAppSelector } from "../../hooks";
import { selectAuthIsLoggedIn } from "../../features/auth/authSlice";
import useFirebaseLogout from "../../hooks/useFirebaseLogout";
import {
  ROUTE_DASHBOARD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SUBMIT_ITEM,
} from "../../constants";

interface HeaderProps {
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = function (props: HeaderProps) {
  const { isHomePage } = props;
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
  const logout = useFirebaseLogout();

  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <ul className="nav__list">
          {!isHomePage && <NavItem to={ROUTE_HOME} text="Home" />}
          <NavItem to={ROUTE_SUBMIT_ITEM} text="Submit an item" />
          {!isLoggedIn && <NavItem to={ROUTE_LOGIN} text="Login" />}
          {isLoggedIn && <NavItem to={ROUTE_DASHBOARD} text="Dashboard" />}
          {isLoggedIn && <NavItem text="Logout" onClick={logout} />}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
