import React from "react";

const PreviewFilter: React.FC = function () {
  return (
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
  );
};

export default PreviewFilter;
