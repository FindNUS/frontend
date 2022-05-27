import React from "react";
import Header from "../components/header/Header";
import SearchResults from "../features/search/SearchResults";

const SearchPage: React.FC = function () {
  return (
    <div className="search-page">
      <Header />

      <div className="search-message">
        <h2 className="heading-white text-white-shadow">Search Results</h2>
      </div>

      <div className="search-container">
        <section className="search-filter">
          <h4>Filter Items</h4>
          <select className="search-filter__dropdown">
            <option value="category">Category</option>
            <option value="date">Date</option>
            <option value="location">Location</option>
          </select>
          <div className="search-filter__filter-option">
            <input type="radio" name="category" value="electronics" />
            &nbsp;Electronics
            <br />
            <input type="radio" name="category" value="cards" />
            &nbsp;Cards
            <br />
            <input type="radio" name="category" value="notes" />
            &nbsp;Notes
            <br />
          </div>
        </section>

        <section className="search-results">
          <SearchResults />
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
