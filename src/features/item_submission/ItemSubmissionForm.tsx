import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";
import FormField from "../../components/form/FormField";
import { ROUTE_SUBMIT_ITEM_POST } from "../../constants";
import { useAppDispatch } from "../../hooks";
import {
  setSubmitDate,
  setSubmitName,
  setSubmitLocation,
  setSubmitAdditionalDetails,
  setSubmitContactDetails,
  setSubmitImageState,
  setSubmitContactMethod,
  setSubmitCategory,
  generateSubmitPayload,
} from "./submitItemSlice";
import UploadDragDrop from "./UploadDragDrop";

const ItemSubmissionForm: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmitForm = (ev: React.FormEvent) => {
    ev.preventDefault();
    dispatch(generateSubmitPayload());
    navigate(ROUTE_SUBMIT_ITEM_POST);
  };

  const handleDescriptionChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitName(value));
  };
  const handleLocationChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitLocation(value));
  };
  const handleDateChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitDate(new Date(value).toISOString()));
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
    dispatch(
      setSubmitImageState({
        type: "URL",
        data: url,
        isLoading: false,
      })
    );
  };
  const handleContactMethodChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitContactMethod(value));
  };
  const handleCategoryChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    dispatch(setSubmitCategory(value));
  };

  return (
    <form className="submit-item__form" onSubmit={handleSubmitForm}>
      <div className="submit-item__form--fields">
        <FormField
          onChange={handleDescriptionChange}
          labelContent="Item Description"
          disabled={false}
        />
        {/* TODO: Add dropdown for item category */}
        <FormField
          onChange={handleCategoryChange}
          labelContent="Category"
          disabled={false}
        />
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
          onChange={handleContactMethodChange}
          labelContent="Contact Method (optional)"
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
        <ButtonSubmit className="btn btn--primary" text="Submit" />
      </div>
      <UploadDragDrop
        className="submit-item__form--upload"
        onImageUpload={handleImageURLChange}
      />
    </form>
  );
};

export default ItemSubmissionForm;
