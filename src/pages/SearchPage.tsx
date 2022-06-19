import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import {
  selectQuery,
  selectQueryResults,
  selectSearchLoading,
} from "../features/search/searchSlice";
import PageTitle from "../components/PageTitle";

const SearchPage: React.FC = function () {
  const query = useAppSelector(selectQuery);
  const queryResults = useAppSelector(selectQueryResults);
  const queryLoading = useAppSelector(selectSearchLoading);
  return (
    <div className="search-page background background--main">
      <Header />
      <PageTitle
        title="Search Results"
        message={
          queryLoading
            ? ""
            : `Showing ${queryResults.length} ${
                queryResults.length === 1 ? "result" : "results"
              } for "${query}"`
        }
      />
      <Outlet />
    </div>
  );
};

export default SearchPage;
