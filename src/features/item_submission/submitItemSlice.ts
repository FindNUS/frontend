import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface SubmitItemState {
  description: string;
  location: string;
  date: string;
  contactDetails: string;
  additionalDetails: string;
  imageURL: string;
}

const initialSubmitItemState: SubmitItemState = {
  description: "",
  location: "",
  date: "",
  contactDetails: "",
  additionalDetails: "",
  imageURL: "",
};

export const submitItemSlice = createSlice({
  name: "submitItem",
  initialState: initialSubmitItemState,
  reducers: {
    setSubmitDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setSubmitLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setSubmitDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setSubmitContactDetails(state, action: PayloadAction<string>) {
      state.contactDetails = action.payload;
    },
    setSubmitAdditionalDetails(state, action: PayloadAction<string>) {
      state.additionalDetails = action.payload;
    },
    setSubmitImageURL(state, action: PayloadAction<string>) {
      state.imageURL = action.payload;
    },
  },
});

export const {
  setSubmitDescription,
  setSubmitLocation,
  setSubmitDate,
  setSubmitContactDetails,
  setSubmitAdditionalDetails,
  setSubmitImageURL,
} = submitItemSlice.actions;

export const selectSubmitDescription = (state: RootState) =>
  state.submitItem.description;
export const selectSubmitLocation = (state: RootState) =>
  state.submitItem.location;
export const selectSubmitDate = (state: RootState) => state.submitItem.date;
export const selectSubmitContactDetails = (state: RootState) =>
  state.submitItem.contactDetails;
export const selectSubmitAdditionalDetails = (state: RootState) =>
  state.submitItem.additionalDetails;
export const selectSubmitImageURL = (state: RootState) =>
  state.submitItem.imageURL;

export default submitItemSlice.reducer;
