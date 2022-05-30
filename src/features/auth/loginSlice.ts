import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { LoginStatus } from "./LoginForm";
import { PopupMessageProps } from "../../components/PopupMessage";

interface LoginState {
  number: string;
  otp: string;
  state: PopupMessageProps;
  lastRequested: number | undefined;
}

const initialLoginState: LoginState = {
  number: "",
  otp: "",
  state: {
    status: undefined,
    message: "",
  },
  lastRequested: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    onChangeNumber(state, action: PayloadAction<string>) {
      state.number = action.payload;
    },
    onChangeOTP(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
    updateStatus(state, action: PayloadAction<LoginStatus>) {
      state.state.status = action.payload;
    },
    updateMessage(state, action: PayloadAction<string>) {
      state.state.message = action.payload;
    },
    setLastRequested(state, action: PayloadAction<number | undefined>) {
      state.lastRequested = action.payload;
    },
  },
});

export const {
  onChangeNumber,
  onChangeOTP,
  updateMessage,
  updateStatus,
  setLastRequested,
} = loginSlice.actions;

export const selectNumber = (state: RootState) => state.login.number;
export const selectOTP = (state: RootState) => state.login.otp;
export const selectLoginStatus = (state: RootState) => state.login.state.status;
export const selectLoginMessage = (state: RootState) =>
  state.login.state.message;
export const selectLastRequested = (state: RootState) =>
  state.login.lastRequested;

export default loginSlice.reducer;
