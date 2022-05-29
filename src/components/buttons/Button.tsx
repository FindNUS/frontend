import React from "react";

interface ButtonProps {
  class: string;
  text: string;
}

const Button: React.FC<ButtonProps> = function (props: ButtonProps) {
  return <a className={props.class}>{props.text}</a>;
};

export default Button;
