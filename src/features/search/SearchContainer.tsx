import React from "react";
import { useAppSelector } from "../../hooks";
import PreviewFilter from "../preview_items/PreviewFilter";
import PreviewItems from "../preview_items/PreviewItems";
import { selectPreviewLoading } from "../preview_items/previewItemsSlice";

const SearchContainer: React.FC = function () {
  const loading = useAppSelector(selectPreviewLoading);

  return (
    <div className="search-container">
      {!loading && <PreviewFilter />}
      <PreviewItems />
    </div>
  );
};

export default SearchContainer;
