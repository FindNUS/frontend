import React from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  class: string;
  text: string;
  to: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = function (
  props: ButtonLinkProps
) {
  return (
    <div className={props.class}>
      <Link
        to={props.to}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {props.text}
      </Link>
    </div>
  );
};

export default ButtonLink;
