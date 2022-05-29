import React, { useEffect } from "react";
import ItemCard from "../../components/ItemCard";
import useAxiosGet from "../../hooks/useAxiosGet";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { API_BASE_URL } from "../../constants";
import {
  selectQuery,
  selectQueryResults,
  setQueryResults,
  setSearchLoading,
} from "./searchSlice";

type rawSearchResultsType = {
  Name: string;
  Id: string;
  Date: string;
  Location: string;
  Category: string;
  Image_url: string;
}[];

export type searchResultsType = ReturnType<typeof parseSearchResults>;

interface searchItemType {
  name: string;
  id: string;
  date: Date;
  location: string;
  category: string;
  imageUrl: string;
}

/**
 * Parses the raw string data and converts it into an object
 * @param response The raw JSON data from API GET
 * @returns Object with the date instance
 */
const parseSearchResults = (response: rawSearchResultsType) => {
  return response.map((item) => {
    const {
      Name: name,
      Id: id,
      Date: date,
      Location: location,
      Category: category,
      Image_url: imageUrl,
    } = item;

    return {
      name,
      id,
      date: new Date(date),
      location,
      category,
      imageUrl,
    };
  });
};

const SearchResults: React.FC = function () {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const queryResults = useAppSelector(selectQueryResults);
  const url = `${API_BASE_URL}/debug/getDemoItem?name=${query}`;
  const {
    response,
    error,
    loading: isLoading,
  } = useAxiosGet({ url, headers: "{}" });

  useEffect(() => {
    if (isLoading) {
      dispatch(setSearchLoading(true));
      return;
    }

    if (response === undefined) {
      dispatch(setQueryResults([]));
      return;
    }
    const items = parseSearchResults(response.data);
    dispatch(setQueryResults(items));
    dispatch(setSearchLoading(false));
  }, [isLoading]);

  return (
    <section className="search-results-container">
      <div className="search-results">
        {isLoading && (
          <div className="search__loading">
            <h2>Loading...</h2>
          </div>
        )}
        {!isLoading && !error && (
          <ul className="search-results__list">
            {queryResults.map((item: searchItemType) => {
              const { name, id, date, location, category, imageUrl } = item;
              return (
                <li className="search-results__item" key={id}>
                  <ItemCard
                    name={name}
                    id={id}
                    date={date}
                    location={location}
                    category={category}
                    imageUrl={imageUrl}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {error && (
          <div className="search__error">
            <h2>Error</h2>
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
