import React from "react";
import Header from "../components/header/Header";
import PageTitle from "../components/PageTitle";
import ItemSubmissionForm from "../features/item_submission/ItemSubmissionForm";

const SubmitItemPage: React.FC = function () {
  return (
    <div className="submit-item-page">
      <Header isSubmitPage={true} />
      <PageTitle title="Submit an Item" />
      <ItemSubmissionForm />
    </div>
  );
};

export default SubmitItemPage;
