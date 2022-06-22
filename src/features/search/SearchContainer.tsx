import React from "react";
import SearchFilter from "./SearchFilter";
import SearchResults from "./SearchResults";

interface SearchContainerProps {
  isPeek?: boolean;
}

const SearchContainer: React.FC<SearchContainerProps> = function (
  props: SearchContainerProps
) {
  return (
    <div className="search-container">
      <SearchFilter />
      <SearchResults isPeek={props.isPeek} />
    </div>
  );
};

export default SearchContainer;
