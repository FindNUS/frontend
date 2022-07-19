import React from "react";
import {
  ROUTE_DASHBOARD_HOME,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SUBMIT_ITEM_TYPE,
} from "../../constants";
import useFirebaseLogout from "../../hooks/useFirebaseLogout";
import NavItem from "./NavItem";

interface NavListProps {
  isLoggedIn: boolean;
  isHomePage: boolean;
  isSubmitPage: boolean;
  isMenuOpen: boolean;
}

const NavList: React.FC<NavListProps> = function (props: NavListProps) {
  const { isHomePage, isSubmitPage, isLoggedIn, isMenuOpen } = props;
  const logout = useFirebaseLogout();

  return (
    <ul className={`nav__list ${isMenuOpen ? "nav__list--show" : ""}`}>
      {!isHomePage && <NavItem to={ROUTE_HOME} text="Home" />}
      {!isSubmitPage && (
        <NavItem to={ROUTE_SUBMIT_ITEM_TYPE} text="Submit&nbsp;an&nbsp;item" />
      )}
      {!isLoggedIn && <NavItem to={ROUTE_LOGIN} text="Login" />}
      {isLoggedIn && <NavItem to={ROUTE_DASHBOARD_HOME} text="Dashboard" />}
      {isLoggedIn && <NavItem text="Logout" onClick={logout} />}
    </ul>
  );
};

export default NavList;
