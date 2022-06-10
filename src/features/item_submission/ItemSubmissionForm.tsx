import React, { useState } from "react";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";
import FormField from "../../components/form/FormField";
import PopupMessage from "../../components/PopupMessage";
import { ENDPOINT_ITEM_FOUND } from "../../constants";
import { useAppDispatch } from "../../hooks";
import useAxiosPost from "../../hooks/useAxiosPost";
import {
  setSubmitDate,
  setSubmitDescription,
  setSubmitLocation,
  setSubmitAdditionalDetails,
  setSubmitContactDetails,
  setSubmitImageURL,
} from "./submitItemSlice";
import UploadDragDrop from "./UploadDragDrop";

interface SchemaSubmitFoundItem {
  Name: string;
  Date: string;
  Location: string;
  Category: string;
  Contact_method: string;
  Contact_details: string;
  Item_details: string;
  Image_base64: string;
}

const processFoundItemForAPI = (data: {
  name: string;
  date: Date;
  location: string;
  category: string;
  contactMethod: string;
  contactDetails: string;
  itemDetails: string;
  base64URL: string;
}) => {
  return {
    Name: data.name,
    Date: data.date.toISOString(),
    Location: data.location,
    Category: data.category,
    Contact_method: data.contactMethod,
    Contact_details: data.contactDetails,
    Item_details: data.itemDetails,
    Image_base64: data.base64URL,
  };
};

const headers = {
  "Content-Type": "application/json",
};

const DUMMY_PAYLOAD = {
  name: "Water Bottle",
  date: new Date("2019-08-24T14:15:22Z"),
  location: "E4A DSA Lab",
  category: "Cards",
  contactMethod: "Telegram",
  contactDetails: "FindNUS",
  itemDetails: "Blue, with a sticker and broken handle",
  base64URL: "string",
};

const ItemSubmissionForm: React.FC = function () {
  const dispatch = useAppDispatch();
  const [postData, setPostData] = useState<SchemaSubmitFoundItem>({
    Name: "",
    Date: "",
    Location: "",
    Category: "",
    Contact_method: "",
    Contact_details: "",
    Item_details: "",
    Image_base64: "",
  });

  const [result, postToAPI] = useAxiosPost({
    url: ENDPOINT_ITEM_FOUND,
    headers: JSON.stringify(headers),
    payload: JSON.stringify(postData),
  });

  const {
    error: submitError,
    isLoading: isSubmitting,
    data: submitResponse,
  } = result;

  const handleSubmitForm = (ev: React.FormEvent) => {
    ev.preventDefault();
    setPostData(() => processFoundItemForAPI(DUMMY_PAYLOAD));
    console.log(postData);
    postToAPI();
  };

  const handleDescriptionChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitDescription(value));
  };
  const handleLocationChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitLocation(value));
  };
  const handleDateChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitDate(value));
  };
  const handleAdditionalDetailsChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitAdditionalDetails(value));
  };
  const handleContactDetailsChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitContactDetails(value));
  };
  const handleImageURLChange = async (url: string) => {
    dispatch(setSubmitImageURL(url));
  };

  return (
    <form className="submit-item__form" onSubmit={handleSubmitForm}>
      <div className="submit-item__form--fields">
        {isSubmitting && (
          <PopupMessage status="loading" message="Submitting item..." />
        )}
        {submitError && !isSubmitting && !submitResponse && (
          <PopupMessage
            status="error"
            message={`
              Item submission failed: ${submitError.message}
            `}
          />
        )}
        <FormField
          onChange={handleDescriptionChange}
          labelContent="Item Description"
          disabled={false}
        />
        {/* TODO: Add dropdown for item category */}
        <FormField
          onChange={handleLocationChange}
          labelContent="Location"
          disabled={false}
        />
        <FormField
          onChange={handleDateChange}
          labelContent="Date"
          type="date"
          disabled={false}
        />
        <FormField
          onChange={handleContactDetailsChange}
          labelContent="Contact details (optional)"
          disabled={false}
        />
        <FormField
          onChange={handleAdditionalDetailsChange}
          labelContent="Additional details"
          type="textarea"
          disabled={false}
        />
        {!isSubmitting && (
          <ButtonSubmit className="btn btn--primary" text="Submit" />
        )}
      </div>
      <UploadDragDrop
        className="submit-item__form--upload"
        onImageUpload={handleImageURLChange}
      />
    </form>
  );
};

export default ItemSubmissionForm;
