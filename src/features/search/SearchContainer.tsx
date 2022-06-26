import React from "react";
import PreviewFilter from "../preview_items/PreviewFilter";
import PreviewItems from "../preview_items/PreviewItems";

const SearchContainer: React.FC = function () {
  return (
    <div className="search-container">
      <PreviewFilter />
      <PreviewItems />
    </div>
  );
};

export default SearchContainer;
