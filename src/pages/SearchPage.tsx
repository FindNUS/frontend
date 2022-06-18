import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

const SearchPage: React.FC = function () {
  return (
    <div className="search-page">
      <Header />
      <Outlet />
    </div>
  );
};

export default SearchPage;
