import React from "react";
import Header from "../components/header/Header";
import ViewItem from "../features/search/ViewItem";

const ViewPage: React.FC = function () {
  return (
    <div className="background background--main">
      <Header />
      <ViewItem />
    </div>
  );
};

export default ViewPage;
