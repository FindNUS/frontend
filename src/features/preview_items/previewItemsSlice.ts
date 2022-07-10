import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface PreviewItemsState {
  pageNumber: number;
  isLastPage: boolean;
}

const initialPreviewItemsState: PreviewItemsState = {
  pageNumber: 1,
  isLastPage: false,
};

export const previewItemsSlice = createSlice({
  name: "previewItems",
  initialState: initialPreviewItemsState,
  reducers: {
    setPreviewPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPreviewLastPage(state, action: PayloadAction<boolean>) {
      state.isLastPage = action.payload;
      state.isLastPage = action.payload;
    },
    resetPreview(state) {
      state.pageNumber = initialPreviewItemsState.pageNumber;
      state.isLastPage = initialPreviewItemsState.isLastPage;
    },
  },
});

export const { setPreviewPageNumber, setPreviewLastPage, resetPreview } =
  previewItemsSlice.actions;

export const selectPreviewPageNumber = (state: RootState) =>
  state.previewItem.pageNumber;
export const selectPreviewLastPage = (state: RootState) =>
  state.previewItem.isLastPage;

export default previewItemsSlice.reducer;
