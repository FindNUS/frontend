import React from "react";
import Header from "../components/header/Header";

const SubmitItemPage: React.FC = function () {
  return (
    <div className="submit-item-page">
      <Header isSubmitPage={true} />
    </div>
  );
};

export default SubmitItemPage;
