import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface SubmitItemState {
  additionalDetails: string;
  category: string;
  contactDetails: string;
  contactMethod: string;
  date: string;
  name: string;
  imageURL: string;
  location: string;
  payload?: PayloadFoundItem;
}

interface PayloadFoundItem {
  Name: string;
  Date: string;
  Location: string;
  Category: string;
  Contact_method?: string;
  Contact_details?: string;
  Item_details?: string;
  Image_base64?: string;
}

const initialSubmitItemState: SubmitItemState = {
  additionalDetails: "",
  category: "",
  contactDetails: "",
  contactMethod: "",
  date: "",
  name: "",
  imageURL: "",
  location: "",
};

const processFoundItemForAPI = (data: {
  name: string;
  date: string;
  location: string;
  category: string;
  contactMethod?: string;
  contactDetails?: string;
  itemDetails?: string;
  additionalDetails?: string;
  base64URL?: string;
}) => {
  const { contactDetails, contactMethod, itemDetails, base64URL } = data;
  return {
    Name: data.name,
    Date: data.date,
    Location: data.location,
    Category: data.category,
    ...(contactMethod !== "" && { Contact_method: contactMethod }),
    ...(contactDetails !== "" && { Contact_details: contactDetails }),
    ...(itemDetails !== "" && { Item_details: itemDetails }),
    ...(base64URL !== "" && { Image_base64: base64URL }),
  };
};

export const submitItemSlice = createSlice({
  name: "submitItem",
  initialState: initialSubmitItemState,
  reducers: {
    setSubmitName(state, action: PayloadAction<string>) {
      state.name = action.payload;
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
    setSubmitCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSubmitContactMethod(state, action: PayloadAction<string>) {
      state.contactMethod = action.payload;
    },
    generateSubmitPayload(state, action: PayloadAction<string>) {
      const {
        category,
        name,
        date,
        location,
        contactDetails,
        contactMethod,
        additionalDetails,
      } = state;

      const { payload: imageBase64 } = action;

      state.payload = processFoundItemForAPI({
        category,
        name,
        date,
        location,
        ...(contactDetails !== "" && { contactDetails }),
        ...(contactMethod !== "" && { contactMethod }),
        ...(additionalDetails !== "" && { additionalDetails }),
        ...(imageBase64 !== "" && { imageBase64 }),
      });
    },
  },
});

export const {
  setSubmitName,
  setSubmitLocation,
  setSubmitDate,
  setSubmitContactDetails,
  setSubmitAdditionalDetails,
  setSubmitImageURL,
  setSubmitCategory,
  setSubmitContactMethod,
  generateSubmitPayload,
} = submitItemSlice.actions;

export const selectSubmitName = (state: RootState) => state.submitItem.name;
export const selectSubmitLocation = (state: RootState) =>
  state.submitItem.location;
export const selectSubmitDate = (state: RootState) => state.submitItem.date;
export const selectSubmitContactDetails = (state: RootState) =>
  state.submitItem.contactDetails;
export const selectSubmitAdditionalDetails = (state: RootState) =>
  state.submitItem.additionalDetails;
export const selectSubmitImageURL = (state: RootState) =>
  state.submitItem.imageURL;
export const selectSubmitCategory = (state: RootState) =>
  state.submitItem.category;
export const selectSubmitContactMethod = (state: RootState) =>
  state.submitItem.imageURL;
export const selectSubmitPayload = (state: RootState) =>
  state.submitItem.payload;
export default submitItemSlice.reducer;
