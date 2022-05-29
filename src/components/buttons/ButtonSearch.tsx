import React from "react";
import Search from "@mui/icons-material/Search";

interface ButtonSearchProps {
  onSearch: (ev: React.FormEvent) => void;
}

const ButtonSearch: React.FC<ButtonSearchProps> = function (
  props: ButtonSearchProps
) {
  return (
    <div className="btn btn--icon btn--search" onClick={props.onSearch}>
      <Search style={{ color: "white", fontSize: 32 }} />
      <span>Search</span>
    </div>
  );
};

export default ButtonSearch;
