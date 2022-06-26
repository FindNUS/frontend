import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import {
  RequiredField,
  FORM_FIELD_STATUS_SUBMIT,
  DROPDOWN_DEFAULT_KEY,
} from "../../constants";
import processSubmitItemForAPI, {
  APIItemType,
} from "../../utils/processSubmitItemForAPI";

interface SubmitItemState {
  additionalDetails: string;
  category: string;
  contactDetails: string;
  contactMethod: string;
  date: string;
  name: string;
  image: ImageState;
  location: string;
  payload?: APIItemType;
  formInputStatus: RequiredField[];
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

const initialSubmitItemState: SubmitItemState = {
  additionalDetails: "",
  category: DROPDOWN_DEFAULT_KEY,
  contactDetails: "",
  contactMethod: DROPDOWN_DEFAULT_KEY,
  date: "",
  name: "",
  image: {
    url: undefined,
    loading: false,
    result: undefined,
    error: undefined,
  },
  location: "",
  formInputStatus: FORM_FIELD_STATUS_SUBMIT,
  payload: {
    Name: "",
    Date: "",
    Location: "",
    Category: "",
    Contact_details: "",
    Contact_method: "",
    Image_base64: "",
    Item_details: "",
    User_id: "",
  },
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
    generateSubmitPayload(state, action: PayloadAction<string | undefined>) {
      const {
        category,
        name,
        date,
        location,
        contactDetails,
        contactMethod,
        additionalDetails,
      } = state;

      const userID = action.payload;
      const imageBase64 = state.image.result ?? "";

      state.payload = initialSubmitItemState.payload;

      state.payload = processSubmitItemForAPI({
        category,
        name,
        date,
        location,
        ...(contactDetails !== "" && { contactDetails }),
        ...(contactMethod !== "" && { contactMethod }),
        ...(additionalDetails !== "" && { additionalDetails }),
        ...(imageBase64 !== "" && { imageBase64 }),
        ...(userID && { userID }),
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
      state.formInputStatus = initialSubmitItemState.formInputStatus;
      state.payload = initialSubmitItemState.payload;
    },
    setSubmitFormInputStatus(
      state,
      action: PayloadAction<{
        identifier: string;
        completed: boolean | undefined;
      }>
    ) {
      const { payload: instruction } = action;
      state.formInputStatus.forEach((field) => {
        if (field.identifier !== instruction.identifier) return;
        return (field.completed = instruction.completed);
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
  setSubmitImageState,
  setSubmitCategory,
  setSubmitContactMethod,
  generateSubmitPayload,
  clearSubmitInputs,
  setSubmitFormInputStatus,
} = submitItemSlice.actions;

export const selectSubmitInput = (state: RootState) => state.submitItem;
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
export const selectSubmitFormInputStatus = (state: RootState) =>
  state.submitItem.formInputStatus;
export default submitItemSlice.reducer;
