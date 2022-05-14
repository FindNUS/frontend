import React from "react";
import Search from "@mui/icons-material/Search";

const ButtonSearch: React.FC = function () {
  return (
    <div className="btn btn--icon btn--search">
      <Search style={{ color: "white", fontSize: 32 }} />
      <span>Search</span>
    </div>
  );
};

export default ButtonSearch;
