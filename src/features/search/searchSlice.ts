import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { PreviewItemsType } from "../preview_items/PreviewItems";

interface SearchState {
  query: string;
  isLoading: boolean;
  queryResults: PreviewItemsType | [];
}
const initialSearchState: SearchState = {
  query: "",
  isLoading: false,
  queryResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setQueryResults(state, action: PayloadAction<PreviewItemsType>) {
      state.queryResults = action.payload;
    },
    setSearchLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

// Actions
export const { setQuery, setQueryResults, setSearchLoading } =
  searchSlice.actions;

// Selectors
export const selectQuery = (state: RootState) => state.search.query;
export const selectQueryResults = (state: RootState) =>
  state.search.queryResults;
export const selectSearchLoading = (state: RootState) => state.search.isLoading;

// Reducer
export default searchSlice.reducer;
