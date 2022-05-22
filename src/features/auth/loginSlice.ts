import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface LoginState {
  number: string;
  otp: string;
}

const initialLoginState: LoginState = {
  number: "",
  otp: "",
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
  },
});

export const { onChangeNumber, onChangeOTP } = loginSlice.actions;

export const selectNumber = (state: RootState) => state.login.number;
export const selectOTP = (state: RootState) => state.login.otp;

export default loginSlice.reducer;
