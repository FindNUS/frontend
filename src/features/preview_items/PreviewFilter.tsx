import React, { useEffect } from "react";
import Button from "../../components/buttons/Button";
import DropdownButton from "../../components/form/DropdownButton";
import FormField from "../../components/form/FormField";
import PopupMessage from "../../components/PopupMessage";
import {
  DROPDOWN_DEFAULT_KEY,
  DROPDOWN_ITEMS_PER_PAGE,
  OLDEST_ALLOWED_DATE,
  SUBMIT_FOUND_CATEGORIES,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import getDateInputValue from "../../utils/getDateInputValue";
import {
  resetPreview,
  selectPreviewCategory,
  selectPreviewDate,
  selectPreviewItemsPerPage,
  setPreviewCategory,
  setPreviewDateEnd,
  setPreviewDateStart,
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
  const dateFilter = useAppSelector(selectPreviewDate);

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

  const handleStartDateChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setPreviewDateStart(value));
  };

  const handleEndDateChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setPreviewDateEnd(value));
  };

  // reset previous filters
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
            {dateFilter.isInvalid && (
              <PopupMessage
                status="error"
                message="End date must not be earlier than start!"
              />
            )}
            <FormField
              onChange={handleStartDateChange}
              labelContent="Start Date"
              type="date"
              disabled={false}
              value={dateFilter.start}
              dateMin={getDateInputValue(OLDEST_ALLOWED_DATE)}
              dateMax={getDateInputValue(new Date())}
            />
            <FormField
              onChange={handleEndDateChange}
              labelContent="End Date"
              type="date"
              disabled={false}
              value={dateFilter.end}
              dateMin={getDateInputValue(OLDEST_ALLOWED_DATE)}
              dateMax={getDateInputValue(new Date())}
            />
          </>
        )}
        {(selectedCategory !== DROPDOWN_DEFAULT_KEY || dateFilter.edited) && (
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
