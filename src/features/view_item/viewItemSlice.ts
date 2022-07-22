import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { PopupMessageStatus } from "../../components/PopupMessage";

export type ViewItemFrom = "dashboard" | "peek" | "search";
interface ViewItemState {
  isLoading: boolean;
  status: PopupMessageStatus;
  message?: string;
  id?: string;
  userId?: string;
  from: ViewItemFrom;
  isSimilarItem: boolean;
}

const initialViewItemState: ViewItemState = {
  isLoading: false,
  status: undefined,
  from: "peek",
  isSimilarItem: false,
};

export const viewItemSlice = createSlice({
  name: "viewItem",
  initialState: initialViewItemState,
  reducers: {
    setViewLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setViewStatus(state, action: PayloadAction<PopupMessageStatus>) {
      state.status = action.payload;
    },
    setViewMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },
    updateViewStore(
      state,
      action: PayloadAction<{
        isLoading: boolean;
        status: PopupMessageStatus;
        message?: string;
      }>
    ) {
      const { isLoading, status, message } = action.payload;
      state.isLoading = isLoading;
      state.status = status;
      state.message = message;
    },
    setViewItemId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setViewItemUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setViewItemFrom(state, action: PayloadAction<ViewItemFrom>) {
      state.from = action.payload;
    },
    setViewIsSimilarItem(state, action: PayloadAction<boolean>) {
      state.isSimilarItem = action.payload;
    },
    resetViewItem(state) {
      state.isLoading = initialViewItemState.isLoading;
      state.status = initialViewItemState.status;
      state.message = initialViewItemState.message;
      state.id = initialViewItemState.id;
      state.userId = initialViewItemState.userId;
      state.from = initialViewItemState.from;
      state.isSimilarItem = initialViewItemState.isSimilarItem;
    },
  },
});

export const {
  setViewLoading,
  setViewMessage,
  setViewStatus,
  updateViewStore,
  setViewItemId,
  setViewItemUserId,
  setViewItemFrom,
  setViewIsSimilarItem,
  resetViewItem,
} = viewItemSlice.actions;

export const selectViewLoading = (state: RootState) => state.viewItem.isLoading;
export const selectViewMessage = (state: RootState) => state.viewItem.message;
export const selectViewStatus = (state: RootState) => state.viewItem.status;
export const selectViewItemSlice = (state: RootState) => state.viewItem;

export default viewItemSlice.reducer;
