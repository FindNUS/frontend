import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string;
}

const initialAuthState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      if (action.payload) state.isLoggedIn = !!action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

// Actions
export const { setLoading, setToken, setIsLoggedIn } = authSlice.actions;

// Selectors
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

// Reducer
export default authSlice.reducer;
