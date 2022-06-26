import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import DropdownButton from "../../components/form/DropdownButton";
import {
  DROPDOWN_DEFAULT_KEY,
  QUERY_VIEW_ITEM_CATEGORY,
  SUBMIT_FOUND_CATEGORIES,
} from "../../constants";

const PreviewFilter: React.FC = function () {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<string>(DROPDOWN_DEFAULT_KEY);

  const handleCategoryChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLSelectElement;
    setSelectedCategory(value);
    navigate(`${location.pathname}?${QUERY_VIEW_ITEM_CATEGORY}=${value}`);
  };

  const handleResetFilter = () => {
    setSelectedCategory(DROPDOWN_DEFAULT_KEY);
    navigate(
      `${location.pathname}?${QUERY_VIEW_ITEM_CATEGORY}=${DROPDOWN_DEFAULT_KEY}`
    );
  };

  return (
    <section className="search-filter">
      <h4>Filter Items</h4>
      <form className="search-filter__form">
        <DropdownButton
          dropdownName="filter-category"
          dropdownID="filter-category"
          options={SUBMIT_FOUND_CATEGORIES}
          onChange={handleCategoryChange}
          selected={selectedCategory}
        />
        {selectedCategory !== DROPDOWN_DEFAULT_KEY && (
          <Button
            class="btn btn--secondary"
            text="Reset filters"
            onClick={handleResetFilter}
          />
        )}
      </form>
    </section>
  );
};

export default PreviewFilter;
