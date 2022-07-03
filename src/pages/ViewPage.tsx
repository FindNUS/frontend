import React from "react";
import Header from "../components/header/Header";
import ViewItem from "../features/view_item/ViewItem";
import { useAppSelector } from "../hooks";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";

const ViewPage: React.FC = function () {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <div className="background background--main">
      <Header isLoggedIn={isLoggedIn} />
      <ViewItem />
    </div>
  );
};

export default ViewPage;
