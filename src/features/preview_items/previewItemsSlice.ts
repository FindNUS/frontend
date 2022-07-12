import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { DEFAULT_ITEMS_PER_PAGE, DROPDOWN_DEFAULT_KEY } from "../../constants";

interface PreviewItemsState {
  pageNumber: number;
  isLastPage: boolean;
  category: string;
  isValidFilter: boolean;
  itemsPerPage: number;
  offset: number;
  query: string | undefined;
}

const initialPreviewItemsState: PreviewItemsState = {
  pageNumber: 1,
  isLastPage: false,
  category: DROPDOWN_DEFAULT_KEY,
  isValidFilter: true,
  itemsPerPage: +DEFAULT_ITEMS_PER_PAGE,
  offset: 0,
  query: undefined,
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
      if (action.payload === DROPDOWN_DEFAULT_KEY) {
        state.isValidFilter = false;
        return;
      }

      state.category = action.payload;
      state.isValidFilter = true;
    },
    setPreviewItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    resetPreviewPagination(state) {
      state.isLastPage = initialPreviewItemsState.isLastPage;
      state.offset = initialPreviewItemsState.offset;
      state.pageNumber = initialPreviewItemsState.pageNumber;
    },
    resetPreview(state) {
      state.category = initialPreviewItemsState.category;
      state.itemsPerPage = initialPreviewItemsState.itemsPerPage;
      state.isLastPage = initialPreviewItemsState.isLastPage;
      state.isValidFilter = initialPreviewItemsState.isValidFilter;
      state.offset = initialPreviewItemsState.offset;
      state.pageNumber = initialPreviewItemsState.pageNumber;
      state.query = initialPreviewItemsState.query;
    },
  },
});

export const {
  setPreviewPageNumber,
  setPreviewLastPage,
  setPreviewCategory,
  setPreviewItemsPerPage,
  resetPreview,
  resetPreviewPagination,
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

export default previewItemsSlice.reducer;
