import React from "react";

interface ButtonSubmitProps {
  className: string;
  text: string;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = function (
  props: ButtonSubmitProps
) {
  const { className } = props;

  return (
    <button type="submit" className={className}>
      {props.text}
    </button>
  );
};

export default ButtonSubmit;
