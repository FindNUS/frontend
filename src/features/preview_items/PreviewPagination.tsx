import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

interface PreviewPaginationProps {
  pageNumber: number;
  isLast: boolean;
  className?: string;
  handleBack: () => void;
  handleNext: () => void;
}

const PreviewPagination: React.FC<PreviewPaginationProps> = function (
  props: PreviewPaginationProps
) {
  const { pageNumber, isLast, handleBack, handleNext } = props;
  return (
    <div
      className={`preview-pagination ${props.className}`}
      data-testid="preview-pagination-wrapper"
    >
      {pageNumber > 1 && (
        <div
          className="preview-pagination__back"
          onClick={handleBack}
          data-testid="preview-pagination-back"
        >
          <ArrowBackRoundedIcon fontSize="large" />
          <span>Back</span>
        </div>
      )}
      <span>Page&nbsp;{pageNumber}</span>
      {!isLast && (
        <div
          className="preview-pagination__next"
          onClick={handleNext}
          data-testid="preview-pagination-next"
        >
          <ArrowForwardRoundedIcon fontSize="large" />
          <span>Next</span>
        </div>
      )}
    </div>
  );
};

export default PreviewPagination;
