import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Header from "../components/header/Header";
import PageTitle from "../components/PageTitle";
import {
  QUERY_SUBMIT_TYPE_KEY,
  QUERY_SUBMIT_TYPE_VALUE_FOUND,
  QUERY_SUBMIT_TYPE_VALUE_LOST,
  TITLE_SUBMIT_DEFAULT,
  TITLE_SUBMIT_FOUND,
  TITLE_SUBMIT_LOST,
} from "../constants";

const SubmitItemPage: React.FC = function () {
  const [searchParams] = useSearchParams();
  const type = searchParams.get(QUERY_SUBMIT_TYPE_KEY);
  const isFound = type === QUERY_SUBMIT_TYPE_VALUE_FOUND;
  const isLost = type === QUERY_SUBMIT_TYPE_VALUE_LOST;

  return (
    <div className="submit-item-page background background--main">
      <Header isSubmitPage={true} />
      {!isFound && !isLost && <PageTitle title={TITLE_SUBMIT_DEFAULT} />}
      {isFound && <PageTitle title={TITLE_SUBMIT_FOUND} />}
      {isLost && <PageTitle title={TITLE_SUBMIT_LOST} />}
      <Outlet />
    </div>
  );
};

export default SubmitItemPage;
