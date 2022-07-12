import React, { useEffect } from "react";
import Button from "../../components/buttons/Button";
import DropdownButton from "../../components/form/DropdownButton";
import {
  DROPDOWN_DEFAULT_KEY,
  DROPDOWN_ITEMS_PER_PAGE,
  SUBMIT_FOUND_CATEGORIES,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  resetPreview,
  selectPreviewCategory,
  selectPreviewItemsPerPage,
  setPreviewCategory,
  setPreviewItemsPerPage,
} from "./previewItemsSlice";

interface PreviewFilterProps {
  isPeek?: boolean;
}

const PreviewFilter: React.FC<PreviewFilterProps> = function (
  props: PreviewFilterProps
) {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectPreviewCategory);
  const itemsPerPage = useAppSelector(selectPreviewItemsPerPage);
  const { isPeek = false } = props;

  const handleCategoryChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLSelectElement;
    dispatch(setPreviewCategory(value));
  };
  const handleItemsPerPageChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLSelectElement;
    dispatch(setPreviewItemsPerPage(+value));
  };

  const handleResetFilter = () => {
    dispatch(resetPreview());
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

        {selectedCategory !== DROPDOWN_DEFAULT_KEY && (
          <Button
            class="btn btn--secondary"
            text="Reset filters"
            onClick={handleResetFilter}
          />
        )}
        {isPeek && (
          <>
            <h4>Items per page</h4>
            <DropdownButton
              dropdownName="items-per-page"
              dropdownID="items-per-page"
              options={DROPDOWN_ITEMS_PER_PAGE}
              onChange={handleItemsPerPageChange}
              selected={`${itemsPerPage}`}
            />
          </>
        )}
      </form>
    </section>
  );
};

export default PreviewFilter;
