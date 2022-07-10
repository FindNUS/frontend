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

interface FormItemDetails {
  additionalDetails: string;
  category: string;
  contactDetails: string;
  contactMethod: string;
  date: string;
  name: string;
  image: ImageState;
  location: string;
}

export interface DefaultItem extends FormItemDetails {
  id: string;
}

interface SubmitItemState extends FormItemDetails {
  payload?: APIItemType;
  formInputStatus: RequiredField[];
  defaultValue?: DefaultItem;
  editPayload?: EditItemPayload;
}

interface EditItemPayload extends Partial<APIItemType> {
  User_id?: string; // required
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
  editPayload: {
    Name: undefined,
    Date: undefined,
    Location: undefined,
    Category: undefined,
    Contact_details: undefined,
    Contact_method: undefined,
    Image_base64: undefined,
    Item_details: undefined,
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
    clearSubmitImage(state) {
      state.image = initialSubmitItemState.image;
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
    generateEditPayload(
      state,
      action: PayloadAction<{
        userID: string;
        editedFields: Partial<FormItemDetails>;
      }>
    ) {
      const { editedFields, userID } = action.payload;
      const {
        category,
        name,
        date,
        location,
        contactDetails,
        contactMethod,
        additionalDetails,
      } = editedFields;

      const imageBase64 = state.image.result ?? "";

      state.editPayload = initialSubmitItemState.editPayload;

      state.editPayload = processSubmitItemForAPI({
        ...(category !== DROPDOWN_DEFAULT_KEY && { category }),
        ...(name && { name }),
        ...(date && { date }),
        ...(location && { location }),
        ...(contactDetails && { contactDetails }),
        ...(contactMethod !== DROPDOWN_DEFAULT_KEY && { contactMethod }),
        ...(additionalDetails && { additionalDetails }),
        ...(imageBase64 && { imageBase64 }),
        userID,
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
      state.editPayload = initialSubmitItemState.editPayload;
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
    setSubmitDefaultValue(
      state,
      action: PayloadAction<DefaultItem | undefined>
    ) {
      state.defaultValue = undefined;
      state.defaultValue = action.payload;
      if (!action.payload) return;
      const {
        name,
        category,
        additionalDetails,
        date,
        location,
        contactMethod,
        contactDetails,
        image,
      } = action.payload;
      if (name) state.name = name;
      if (category) state.category = category;
      if (additionalDetails) state.additionalDetails = additionalDetails;
      if (date) state.date = date;
      if (location) state.location = location;
      if (contactMethod) state.contactMethod = contactMethod;
      if (contactDetails) state.contactDetails = contactDetails;
      if (image) state.image = image;
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
  clearSubmitImage,
  setSubmitCategory,
  setSubmitContactMethod,
  generateSubmitPayload,
  generateEditPayload,
  clearSubmitInputs,
  setSubmitFormInputStatus,
  setSubmitDefaultValue,
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
export const selectSubmitEditPayload = (state: RootState) =>
  state.submitItem.editPayload;
export const selectSubmitFormInputStatus = (state: RootState) =>
  state.submitItem.formInputStatus;
export const selectSubmitDefaultValue = (state: RootState) =>
  state.submitItem.defaultValue;
export default submitItemSlice.reducer;
