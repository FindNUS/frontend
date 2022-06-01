import React from "react";

interface PageTitleProps {
  title: string;
  message?: string;
}

const PageTitle: React.FC<PageTitleProps> = function (props: PageTitleProps) {
  return (
    <div className="page-title">
      <h2 className="heading-white text-white-shadow">{props.title}</h2>
      <span className="page-title__message text-white-shadow">
        {props.message}
      </span>
    </div>
  );
};

export default PageTitle;
