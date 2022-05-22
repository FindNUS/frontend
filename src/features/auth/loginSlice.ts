import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import firebase from "firebase/compat/app";

interface LoginState {
  number: string;
  otp: string;
  confirmationResult: firebase.auth.ConfirmationResult | undefined;
}

const initialLoginState: LoginState = {
  number: "",
  otp: "",
  confirmationResult: undefined,
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
    setConfirmationResult(
      state,
      action: PayloadAction<firebase.auth.ConfirmationResult>
    ) {
      state.confirmationResult = action.payload;
    },
  },
});

export const { onChangeNumber, onChangeOTP, setConfirmationResult } =
  loginSlice.actions;

export const selectNumber = (state: RootState) => state.login.number;
export const selectOTP = (state: RootState) => state.login.otp;
export const selectConfirmationResult = (state: RootState) =>
  state.login.confirmationResult;

export default loginSlice.reducer;
