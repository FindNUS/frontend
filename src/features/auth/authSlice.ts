import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string;
  isFirstTime: boolean;
  verificationId?: string;
}

const initialAuthState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  token: "",
  isFirstTime: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      if (action.payload) state.isLoggedIn = !!action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setAuthIsFirstTime(state, action: PayloadAction<boolean>) {
      state.isFirstTime = action.payload;
    },
    setAuthVerificationId(state, action: PayloadAction<string>) {
      state.verificationId = action.payload;
    },
  },
});

// Actions
export const {
  setLoading,
  setToken,
  setIsLoggedIn,
  setAuthIsFirstTime,
  setAuthVerificationId,
} = authSlice.actions;

// Selectors
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthIsFirstTime = (state: RootState) =>
  state.auth.isFirstTime;
export const selectAuthVerificationId = (state: RootState) =>
  state.auth.verificationId;
// Reducer
export default authSlice.reducer;
