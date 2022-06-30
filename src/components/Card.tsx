import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = function (props: CardProps) {
  const classes = `card ${props.className}`;
  return (
    <div className={classes} data-testid="card-wrapper">
      {props.children}
    </div>
  );
};

export default Card;
