import React from "react";

interface ButtonProps {
  class: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = function (props: ButtonProps) {
  const { disabled = false } = props;
  const onClick = () => {
    if (!props.onClick || disabled) return;
    props.onClick();
  };

  return (
    <a
      className={`${props.class} ${disabled ? "btn--disabled" : ""}`}
      onClick={onClick}
    >
      {props.text}
    </a>
  );
};

export default Button;
