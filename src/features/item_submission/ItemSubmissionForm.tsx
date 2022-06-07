import React from "react";
import Button from "../../components/buttons/Button";
import FormField from "../../components/form/FormField";
import { useAppDispatch } from "../../hooks";
import {
  setSubmitDate,
  setSubmitDescription,
  setSubmitLocation,
  setSubmitAdditionalDetails,
  setSubmitContactDetails,
  setSubmitImageURL,
} from "./submitItemSlice";
import UploadDragDrop from "./UploadDragDrop";

const ItemSubmissionForm: React.FC = function () {
  const dispatch = useAppDispatch();

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
  const handleImageURLChange = (url: string) => {
    dispatch(setSubmitImageURL(url));
  };

  return (
    <form className="submit-item__form">
      <div className="submit-item__form--fields">
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
        <Button class="btn btn--primary" text="Submit" />
      </div>
      <UploadDragDrop
        className="submit-item__form--upload"
        onImageUpload={handleImageURLChange}
      />
    </form>
  );
};

export default ItemSubmissionForm;
