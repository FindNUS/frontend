import React, { useState } from "react";
import Logo from "../Logo";
import MenuButton from "./MenuButton";
import NavList from "./NavList";

interface HeaderProps {
  isLoggedIn: boolean;
  isHomePage?: boolean;
  isSubmitPage?: boolean;
}

const Header: React.FC<HeaderProps> = function (props: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navListProps = {
    isLoggedIn: props.isLoggedIn,
    isHomePage: !!props.isHomePage,
    isSubmitPage: !!props.isSubmitPage,
    isMenuOpen,
  };

  return (
    <header className="header" data-testid="header">
      <div className="header__mobile">
        <Logo className="header__logo" />
        <MenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
      </div>
      {/* Hidden when in mobile view */}
      <nav className="nav nav--main">
        <NavList {...navListProps} />
      </nav>
      {/* Shown in mobile view */}
      {isMenuOpen && (
        <nav className="nav nav--mobile">
          <NavList {...navListProps} />
        </nav>
      )}
    </header>
  );
};

export default Header;
