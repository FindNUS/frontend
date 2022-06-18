import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface SubmitItemState {
  additionalDetails: string;
  category: string;
  contactDetails: string;
  contactMethod: string;
  date: string;
  name: string;
  image: ImageState;
  location: string;
  payload?: PayloadFoundItem;
}

interface ImageState {
  url: string | undefined;
  result: string | undefined;
  loading: boolean;
  error: string | undefined;
}

interface SubmitImageAction {
  type: "URL" | "ERROR" | "LOADING" | "RESULT";
  isLoading: boolean;
  data: string | undefined;
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
  image: {
    url: undefined,
    loading: false,
    result: undefined,
    error: undefined,
  },
  location: "",
};

const processFoundItemForAPI = (data: {
  name: string;
  date: string;
  location: string;
  category: string;
  contactMethod?: string;
  contactDetails?: string;
  additionalDetails?: string;
  imageBase64?: string;
}) => {
  const { contactDetails, contactMethod, additionalDetails, imageBase64 } =
    data;
  return {
    Name: data.name,
    Date: data.date,
    Location: data.location,
    Category: data.category,
    ...(contactMethod !== "" && { Contact_method: contactMethod }),
    ...(contactDetails !== "" && { Contact_details: contactDetails }),
    ...(additionalDetails !== "" && { Item_details: additionalDetails }),
    ...(imageBase64 !== "" && { Image_base64: imageBase64 }),
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
      state.image.url = action.payload;
    },
    setSubmitImageState(state, action: PayloadAction<SubmitImageAction>) {
      const { type, isLoading, data } = action.payload;
      switch (type) {
        case "LOADING":
          state.image = {
            ...state.image,
            loading: isLoading,
          };
          break;
        case "URL":
          state.image = {
            ...state.image,
            url: data,
          };
          break;
        case "ERROR":
          state.image = {
            ...state.image,
            error: data,
          };
          break;
        case "RESULT":
          state.image = {
            ...state.image,
            result: data,
          };
          break;
      }
    },
    setSubmitCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSubmitContactMethod(state, action: PayloadAction<string>) {
      state.contactMethod = action.payload;
    },
    generateSubmitPayload(state) {
      const {
        category,
        name,
        date,
        location,
        contactDetails,
        contactMethod,
        additionalDetails,
      } = state;

      const imageBase64 = state.image.result ?? "";

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
    clearSubmitInputs(state) {
      state.additionalDetails = initialSubmitItemState.additionalDetails;
      state.category = initialSubmitItemState.category;
      state.contactDetails = initialSubmitItemState.contactDetails;
      state.contactMethod = initialSubmitItemState.contactMethod;
      state.date = initialSubmitItemState.date;
      state.image = initialSubmitItemState.image;
      state.location = initialSubmitItemState.location;
      state.name = initialSubmitItemState.name;
      state.payload = initialSubmitItemState.payload;
    },
  },
});

export const {
  setSubmitName,
  setSubmitLocation,
  setSubmitDate,
  setSubmitContactDetails,
  setSubmitAdditionalDetails,
  setSubmitImageState,
  setSubmitCategory,
  setSubmitContactMethod,
  generateSubmitPayload,
  clearSubmitInputs,
} = submitItemSlice.actions;

export const selectSubmitName = (state: RootState) => state.submitItem.name;
export const selectSubmitLocation = (state: RootState) =>
  state.submitItem.location;
export const selectSubmitDate = (state: RootState) => state.submitItem.date;
export const selectSubmitContactDetails = (state: RootState) =>
  state.submitItem.contactDetails;
export const selectSubmitAdditionalDetails = (state: RootState) =>
  state.submitItem.additionalDetails;
export const selectSubmitImageState = (state: RootState) =>
  state.submitItem.image;
export const selectSubmitCategory = (state: RootState) =>
  state.submitItem.category;
export const selectSubmitContactMethod = (state: RootState) =>
  state.submitItem.contactMethod;
export const selectSubmitPayload = (state: RootState) =>
  state.submitItem.payload;
export default submitItemSlice.reducer;
