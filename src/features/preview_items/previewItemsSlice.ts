import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import {
  DEFAULT_ITEMS_PER_PAGE,
  DISPLAY_FILTER_DATE_END,
  DISPLAY_FILTER_DATE_START,
  DROPDOWN_DEFAULT_KEY,
} from "../../constants";
// import { OLDEST_ALLOWED_DATE } from "../../constants";
import getDateInputValue from "../../utils/getDateInputValue";

interface PreviewItemsState {
  pageNumber: number;
  isLastPage: boolean;
  category: string;
  isValidFilter: boolean;
  itemsPerPage: number;
  offset: number;
  query: string | undefined;
  dateRange: {
    end: string;
    start: string;
    isInvalid: boolean;
    edited: boolean;
  };
  isLoading: boolean;
  hasShownLoadingDelayToast: boolean;
}

const initialPreviewItemsState: PreviewItemsState = {
  pageNumber: 1,
  isLastPage: false,
  category: DROPDOWN_DEFAULT_KEY,
  isValidFilter: true,
  itemsPerPage: +DEFAULT_ITEMS_PER_PAGE,
  offset: 0,
  query: undefined,
  dateRange: {
    // end: getDateInputValue(new Date()),
    // start: getDateInputValue(OLDEST_ALLOWED_DATE),
    end: getDateInputValue(DISPLAY_FILTER_DATE_END),
    start: getDateInputValue(DISPLAY_FILTER_DATE_START),
    isInvalid: false,
    edited: false,
  },
  isLoading: false,
  hasShownLoadingDelayToast: false,
};

export const previewItemsSlice = createSlice({
  name: "previewItems",
  initialState: initialPreviewItemsState,
  reducers: {
    setPreviewPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
      state.offset = (action.payload - 1) * state.itemsPerPage;
    },
    setPreviewLastPage(state, action: PayloadAction<boolean>) {
      state.isLastPage = action.payload;
      state.isLastPage = action.payload;
    },
    setPreviewCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.isValidFilter = action.payload !== DROPDOWN_DEFAULT_KEY;
    },
    setPreviewItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    resetPreviewPagination(state) {
      state.isLastPage = initialPreviewItemsState.isLastPage;
      state.offset = initialPreviewItemsState.offset;
      state.pageNumber = initialPreviewItemsState.pageNumber;
    },
    setPreviewDateStart(state, action: PayloadAction<string>) {
      const currentEnd = new Date(state.dateRange.end);
      const newStart = new Date(action.payload);
      if (currentEnd.getTime() < newStart.getTime()) {
        // do not update start date if invalid
        state.dateRange.isInvalid = true;
        return;
      }
      state.dateRange.start = action.payload;
      state.dateRange.isInvalid = false;
      state.dateRange.edited = true;
    },
    setPreviewDateEnd(state, action: PayloadAction<string>) {
      const currentStart = new Date(state.dateRange.start);
      const newEnd = new Date(action.payload);
      if (newEnd.getTime() < currentStart.getTime()) {
        // do not update end date if invalid
        state.dateRange.isInvalid = true;
        return;
      }
      state.dateRange.end = action.payload;
      state.dateRange.isInvalid = false;
      state.dateRange.edited = true;
    },
    setPreviewLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetPreview(state) {
      state.category = initialPreviewItemsState.category;
      state.itemsPerPage = initialPreviewItemsState.itemsPerPage;
      state.isLastPage = initialPreviewItemsState.isLastPage;
      state.isValidFilter = initialPreviewItemsState.isValidFilter;
      state.offset = initialPreviewItemsState.offset;
      state.pageNumber = initialPreviewItemsState.pageNumber;
      state.query = initialPreviewItemsState.query;
      state.dateRange = initialPreviewItemsState.dateRange;
      state.isLoading = initialPreviewItemsState.isLoading;
    },
    setShownLoadingDelayToast(state) {
      state.hasShownLoadingDelayToast = true;
    },
  },
});

export const {
  setPreviewPageNumber,
  setPreviewLastPage,
  setPreviewCategory,
  setPreviewItemsPerPage,
  resetPreviewPagination,
  setPreviewDateEnd,
  setPreviewDateStart,
  setPreviewLoading,
  resetPreview,
  setShownLoadingDelayToast,
} = previewItemsSlice.actions;

export const selectPreviewSlice = (state: RootState) => state.previewItem;
export const selectPreviewPageNumber = (state: RootState) =>
  state.previewItem.pageNumber;
export const selectPreviewLastPage = (state: RootState) =>
  state.previewItem.isLastPage;
export const selectPreviewCategory = (state: RootState) =>
  state.previewItem.category;
export const selectPreviewItemsPerPage = (state: RootState) =>
  state.previewItem.itemsPerPage;
export const selectPreviewOffset = (state: RootState) =>
  state.previewItem.offset;
export const selectPreviewDate = (state: RootState) =>
  state.previewItem.dateRange;
export const selectPreviewLoading = (state: RootState) =>
  state.previewItem.isLoading;
export const selectHasShownLoadingDelayToast = (state: RootState) =>
  state.previewItem.hasShownLoadingDelayToast;

export default previewItemsSlice.reducer;
