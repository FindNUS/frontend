import React from "react";
import Category from "@mui/icons-material/Category";

const ButtonSearch: React.FC = function () {
  return (
    <div className="btn btn--icon btn--found">
      <Category style={{ color: "white", fontSize: 28 }} />
      <span>&nbsp;Found Item</span>
    </div>
  );
};

export default ButtonSearch;
