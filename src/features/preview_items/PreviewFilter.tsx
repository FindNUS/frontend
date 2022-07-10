import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import DropdownButton from "../../components/form/DropdownButton";
import {
  DEFAULT_ITEMS_PER_PAGE,
  DROPDOWN_DEFAULT_KEY,
  DROPDOWN_ITEMS_PER_PAGE,
  QUERY_VIEW_ITEM_CATEGORY,
  QUERY_VIEW_ITEM_PER_PAGE,
  SUBMIT_FOUND_CATEGORIES,
} from "../../constants";

interface PreviewFilterProps {
  isPeek?: boolean;
}

const PreviewFilter: React.FC<PreviewFilterProps> = function (
  props: PreviewFilterProps
) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<string>(DROPDOWN_DEFAULT_KEY);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const { isPeek = false } = props;

  const handleCategoryChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLSelectElement;
    setSelectedCategory(value);
    navigate(
      `${location.pathname}?${QUERY_VIEW_ITEM_CATEGORY}=${value}&${QUERY_VIEW_ITEM_PER_PAGE}=${itemsPerPage}`
    );
  };
  const handleItemsPerPageChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLSelectElement;
    setItemsPerPage(value);
    navigate(
      `${location.pathname}?${QUERY_VIEW_ITEM_CATEGORY}=${selectedCategory}&${QUERY_VIEW_ITEM_PER_PAGE}=${value}`
    );
  };

  const handleResetFilter = () => {
    setSelectedCategory(DROPDOWN_DEFAULT_KEY);
    setItemsPerPage(DEFAULT_ITEMS_PER_PAGE);
    navigate(
      `${location.pathname}?${QUERY_VIEW_ITEM_CATEGORY}=${DROPDOWN_DEFAULT_KEY}&${QUERY_VIEW_ITEM_PER_PAGE}=${DEFAULT_ITEMS_PER_PAGE}`
    );
  };

  // reset params in url to avoid mismatch in params and dropdown values
  useEffect(() => {
    handleResetFilter();
  }, []);

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
        {isPeek && (
          <>
            <h5>Items per page</h5>
            <DropdownButton
              dropdownName="items-per-page"
              dropdownID="items-per-page"
              options={DROPDOWN_ITEMS_PER_PAGE}
              onChange={handleItemsPerPageChange}
              selected={itemsPerPage}
            />
          </>
        )}
        {(selectedCategory !== DROPDOWN_DEFAULT_KEY ||
          itemsPerPage !== DEFAULT_ITEMS_PER_PAGE) && (
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
