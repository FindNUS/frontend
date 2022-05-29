import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  text: string;
  to?: string;
}

const NavItem: React.FC<NavItemProps> = function (props: NavItemProps) {
  switch (props.to) {
    case undefined:
      return <li className="nav__item">{props.text}</li>;
    default:
      return (
        <Link to={props.to} className="link--wrapper">
          <li className="nav__item">{props.text}</li>
        </Link>
      );
  }
};

export default NavItem;
