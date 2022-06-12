import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import PageTitle from "../components/PageTitle";

const SubmitItemPage: React.FC = function () {
  return (
    <div className="submit-item-page">
      <Header isSubmitPage={true} />
      <PageTitle title="Submit an Item" />
      <Outlet />
    </div>
  );
};

export default SubmitItemPage;
