import React from "react";
import Logo from "../logo";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";

const Header: React.FC = function () {
  return (
    <header className="header">
      <Link to="/" className="link--wrapper">
        <Logo />
      </Link>

      <nav className="nav">
        <ul className="nav__list">
          <NavItem to="/" text="Home" />
          <NavItem to="/" text="Lost an item" />
          <NavItem to="/" text="Found an item" />
          <NavItem to="/login" text="Login" />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
