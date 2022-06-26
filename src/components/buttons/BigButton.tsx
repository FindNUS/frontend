import React from "react";

interface BigButtonProps {
  colour: "primary" | "secondary" | "tertiary";
  text: string;
  onClick?: () => void;
}

const BigButton: React.FC<BigButtonProps> = function (props: BigButtonProps) {
  const { colour, onClick, text } = props;
  return (
    <button className={`btn btn-big btn--${colour}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default BigButton;
