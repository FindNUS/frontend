import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import PreviewFilter from "./PreviewFilter";
import PreviewItems from "./PreviewItems";
import { selectPreviewLoading } from "./previewItemsSlice";

const PeekContainer: React.FC = function () {
  const loading = useAppSelector(selectPreviewLoading);
  useEffect(() => console.log(loading), [loading]);
  return (
    <div className="search-container">
      {!loading && <PreviewFilter isPeek={true} />}
      <PreviewItems isPeek={true} />
    </div>
  );
};

export default PeekContainer;
