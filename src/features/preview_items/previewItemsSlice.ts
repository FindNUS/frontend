import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreviewItemsState {
  type: "dashboard" | "peek" | "search" | undefined;
  loading: boolean;
}

const initialPreviewItemsState: PreviewItemsState = {
  type: undefined,
  loading: false,
};

export const previewItemsSlice = createSlice({
  name: "previewItems",
  initialState: initialPreviewItemsState,
  reducers: {
    setGetLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setGetLoading } = previewItemsSlice.actions;

export default previewItemsSlice.reducer;
