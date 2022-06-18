import React from "react";
import SearchFilter from "./SearchFilter";
import SearchResults from "../features/search/SearchResults";
import { useAppSelector } from "../hooks";
import {
  selectQuery,
  selectQueryResults,
  selectSearchLoading,
} from "../features/search/searchSlice";
import PageTitle from "../components/PageTitle";

const SearchContainer: React.FC = function () {
  const query = useAppSelector(selectQuery);
  const queryResults = useAppSelector(selectQueryResults);
  const queryLoading = useAppSelector(selectSearchLoading);
  return (
    <>
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

      <div className="search-container">
        <SearchFilter />
        <SearchResults />
      </div>
    </>
  );
};

export default SearchContainer;
