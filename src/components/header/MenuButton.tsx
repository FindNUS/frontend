import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface MenuBUttonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

const MenuBUtton: React.FC<MenuBUttonProps> = function (
  props: MenuBUttonProps
) {
  const { isMenuOpen, onClick } = props;

  return (
    <div className="nav__menu-button" onClick={onClick}>
      {!isMenuOpen && <MenuRoundedIcon fontSize="inherit" color="inherit" />}
      {isMenuOpen && <CloseRoundedIcon fontSize="inherit" color="inherit" />}
    </div>
  );
};

export default MenuBUtton;
