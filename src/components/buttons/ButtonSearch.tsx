import React from "react";
import Search from "@mui/icons-material/Search";

interface ButtonSearchProps {
  className?: string;
  onSearch: (ev: React.FormEvent) => void;
}

const ButtonSearch: React.FC<ButtonSearchProps> = function (
  props: ButtonSearchProps
) {
  return (
    <div
      className={`btn btn--icon btn--search ${props.className}`}
      onClick={props.onSearch}
    >
      <Search style={{ color: "white", fontSize: 32 }} />
      <span className="search__btn-text">Search</span>
    </div>
  );
};

export default ButtonSearch;
