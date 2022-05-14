import React from "react";
import ButtonSearch from "./ButtonSearch";

interface SearchBarProps {
  prompt: string;
}

const SearchBar: React.FC<SearchBarProps> = function (props: SearchBarProps) {
  return (
    <form>
      <div className="search">
        <input
          type="text"
          className="search__prompt"
          placeholder={props.prompt}
        />
        <ButtonSearch />
      </div>
    </form>
  );
};

export default SearchBar;
