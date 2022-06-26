import React from "react";
import Header from "../components/header/Header";
import ViewItem from "../features/view_item/ViewItem";

const ViewPage: React.FC = function () {
  return (
    <div className="background background--main">
      <Header />
      <ViewItem />
    </div>
  );
};

export default ViewPage;
