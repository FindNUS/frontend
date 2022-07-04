import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { PopupMessageStatus } from "../../components/PopupMessage";

interface ViewItemState {
  isLoading: boolean;
  status: PopupMessageStatus;
  message?: string;
}

const initialViewItemState: ViewItemState = {
  isLoading: false,
  status: undefined,
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
    updateViewStore(state, action: PayloadAction<ViewItemState>) {
      state = action.payload;
    },
  },
});

export const {
  setViewLoading,
  setViewMessage,
  setViewStatus,
  updateViewStore,
} = viewItemSlice.actions;

export const selectViewLoading = (state: RootState) => state.viewItem.isLoading;
export const selectViewMessage = (state: RootState) => state.viewItem.message;
export const selectViewStatus = (state: RootState) => state.viewItem.status;

export default viewItemSlice.reducer;
