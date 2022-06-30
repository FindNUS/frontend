import React from "react";
import Header from "../components/header/Header";
import { useAppSelector } from "../hooks";
import {
  selectQuery,
  selectQueryResults,
  selectSearchLoading,
} from "../features/search/searchSlice";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";
import PageTitle from "../components/PageTitle";
import SearchContainer from "../features/search/SearchContainer";

const SearchPage: React.FC = function () {
  const query = useAppSelector(selectQuery);
  const queryResults = useAppSelector(selectQueryResults);
  const queryLoading = useAppSelector(selectSearchLoading);
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <div className="search-page background background--main">
      <Header isLoggedIn={isLoggedIn} />
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
      <SearchContainer />
    </div>
  );
};

export default SearchPage;
