import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface BackButtonTextProps {
  className?: string;
  message: string;
  onClick: () => void;
}

const BackButtonText: React.FC<BackButtonTextProps> = function (
  props: BackButtonTextProps
) {
  const { className, message, onClick } = props;
  return (
    <div className={`back-btn-text ${className}`} onClick={onClick}>
      <ChevronLeftIcon fontSize="large" />
      <span>{message}</span>
    </div>
  );
};

export default BackButtonText;
