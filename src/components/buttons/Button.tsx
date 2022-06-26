import React from "react";

interface ButtonProps {
  class: string;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = function (props: ButtonProps) {
  return (
    <a className={props.class} onClick={props.onClick}>
      {props.text}
    </a>
  );
};

export default Button;
