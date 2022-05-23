import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { LoginStatus } from "../../features/auth/LoginForm";
import { PopupMessageProps } from "../../components/PopupMessage";

interface LoginState {
  number: string;
  otp: string;
  state: PopupMessageProps;
}

const initialLoginState: LoginState = {
  number: "",
  otp: "",
  state: {
    status: undefined,
    message: "",
  },
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
  },
});

export const { onChangeNumber, onChangeOTP, updateMessage, updateStatus } =
  loginSlice.actions;

export const selectNumber = (state: RootState) => state.login.number;
export const selectOTP = (state: RootState) => state.login.otp;
export const selectLoginStatus = (state: RootState) => state.login.state.status;
export const selectLoginMessage = (state: RootState) =>
  state.login.state.message;

export default loginSlice.reducer;
