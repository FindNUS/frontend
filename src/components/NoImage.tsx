import React from "react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

interface NoImageProps {
  className?: string;
}

const NoImage: React.FC<NoImageProps> = function (props: NoImageProps) {
  return (
    <div
      className={`no-image ${props.className}`}
      data-testid="noimage-wrapper"
    >
      <ImageNotSupportedIcon fontSize="inherit" color="inherit" />
    </div>
  );
};

export default NoImage;
