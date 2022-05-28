import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSearch from "../../components/buttons/ButtonSearch";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectQuery, setQuery } from "./searchSlice";

interface SearchBarProps {
  prompt: string;
}

const SearchBar: React.FC<SearchBarProps> = function (props: SearchBarProps) {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const navigate = useNavigate();

  /**
   * Update search query in the store.
   * Dispatches the setQuery action.
   * @param ev The DOM event triggerred by an input element change.
   */
  const setInputQuery = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const input = ev.target.value;
    dispatch(setQuery(input));
  };

  /**
   * Redirect the user to the search results page.
   * @param ev The DOM event triggerred by a form submit event.
   */
  const handleSearch = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (query === "") return;
    navigate("/search");
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search">
        <input
          type="text"
          className="search__prompt"
          placeholder={props.prompt}
          onChange={setInputQuery}
        />
        <ButtonSearch onSearch={handleSearch} />
      </div>
    </form>
  );
};

export default SearchBar;
