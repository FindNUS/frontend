import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  text: string;
  to?: string;
  onClick?: (() => void) | (() => Promise<void>) | undefined;
}

const NavItem: React.FC<NavItemProps> = function (props: NavItemProps) {
  const { text, to, onClick } = props;
  const id = text.toLowerCase().split(" ").join("-");
  if (!to) {
    return (
      <li className="nav__item" onClick={onClick} id={id}>
        {text}
      </li>
    );
  }

  return (
    <Link to={to} className="link--wrapper">
      <li className="nav__item" onClick={onClick} id={id}>
        {text}
      </li>
    </Link>
  );
};

export default NavItem;
