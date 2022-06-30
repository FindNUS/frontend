import React from "react";
import PopupMessage from "./PopupMessage";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = function (props: LoadingProps) {
  return (
    <div className={`${props.className}`} data-testid="loading-wrapper">
      <PopupMessage status="loading" message="Loading..." />
    </div>
  );
};

export default Loading;
