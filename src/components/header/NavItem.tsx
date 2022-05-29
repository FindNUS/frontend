import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  text: string;
  to?: string;
  onClick?: () => Promise<void> | undefined;
}

const NavItem: React.FC<NavItemProps> = function (props: NavItemProps) {
  switch (props.to) {
    case undefined:
      return (
        <li className="nav__item" onClick={props.onClick}>
          {props.text}
        </li>
      );
    default:
      return (
        <Link to={props.to} className="link--wrapper">
          <li className="nav__item" onClick={props.onClick}>
            {props.text}
          </li>
        </Link>
      );
  }
};

export default NavItem;
