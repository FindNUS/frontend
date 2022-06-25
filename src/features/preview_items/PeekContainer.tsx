import React from "react";
import PreviewFilter from "./PreviewFilter";
import PreviewItems from "./PreviewItems";

const PeekContainer: React.FC = function () {
  return (
    <div className="search-container">
      <PreviewFilter />
      <PreviewItems isPeek={true} />
    </div>
  );
};

export default PeekContainer;
