import React from "react";
import DUMMY_ITEMS_RESPONSE from "../../search_query_example.json";
import ItemCard from "../../components/ItemCard";

type rawSearchResultsType = {
  name: string;
  id: string;
  date: string;
  location: string;
  category: string;
  image_url: string;
}[];

const parseSearchResults = (response: rawSearchResultsType) => {
  return response.map((item) => {
    const { name, id, date, location, category, image_url: imageUrl } = item;
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

export type searchResultsType = ReturnType<typeof parseSearchResults>;

const SearchResults: React.FC = function () {
  const items = parseSearchResults(DUMMY_ITEMS_RESPONSE);
  return (
    <ul className="search-results__list">
      {items.map((item) => {
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
  );
};

export default SearchResults;
