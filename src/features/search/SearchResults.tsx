import React, { useEffect } from "react";
import ItemCard from "../../components/ItemCard";
import useAxiosGet from "../../hooks/useAxiosGet";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  ENDPOINT_DEBUG_GET_DEMO_ITEM,
  ENDPOINT_PEEK,
  PEEK_DEFAULT_LIMIT,
  QUERY_SEARCH_IS_PEEK,
  QUERY_SEARCH_ITEM_ID,
  ROUTE_VIEW_ITEM,
} from "../../constants";
import {
  selectQuery,
  selectQueryResults,
  setQueryResults,
  setSearchLoading,
} from "./searchSlice";
import { useNavigate } from "react-router-dom";

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
  date: string;
  location: string;
  category: string;
  imageUrl: string;
}

/**
 * Parses the raw string data and converts it into an object
 * @param response The raw JSON data from API GET
 * @returns Object with camelCase keys
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
      date,
      location,
      category,
      imageUrl,
    };
  });
};

interface SearchResultsProps {
  isPeek?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = function (
  props: SearchResultsProps
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector(selectQuery);
  const queryResults = useAppSelector(selectQueryResults);
  const isPeek = props.isPeek ?? false;
  const url = isPeek
    ? `${ENDPOINT_PEEK}?limit=${PEEK_DEFAULT_LIMIT}`
    : `${ENDPOINT_DEBUG_GET_DEMO_ITEM}?name=${query}`;
  const [response, error, isLoading] = useAxiosGet({ url });

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

  const handleItemClick = (ev: React.MouseEvent) => {
    const item = ev.currentTarget;
    const id = item.getAttribute("data-id");
    navigate(
      `${ROUTE_VIEW_ITEM}?${QUERY_SEARCH_ITEM_ID}=${id}&${QUERY_SEARCH_IS_PEEK}=${isPeek}`
    );
  };

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
                <li
                  className="search-results__item"
                  key={id}
                  onClick={handleItemClick}
                  data-id={id}
                >
                  <ItemCard
                    name={name}
                    id={id}
                    date={new Date(date)}
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
