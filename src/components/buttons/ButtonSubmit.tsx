import React from "react";

interface ButtonSubmitProps {
  className: string;
  text: string;
  onClick?: (ev: React.MouseEvent) => void;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = function (
  props: ButtonSubmitProps
) {
  const btnProps = {
    className: props.className,
    ...(props.onClick && { onClick: props.onClick }),
  };
  return (
    <button type="submit" {...btnProps}>
      {props.text}
    </button>
  );
};

export default ButtonSubmit;
