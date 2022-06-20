import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";
import DropdownButton from "../../components/form/DropdownButton";
import FormField from "../../components/form/FormField";
import {
  ROUTE_SUBMIT_ITEM_POST,
  SUBMIT_FOUND_CATEGORIES,
  SUBMIT_FOUND_CONTACT_METHODS,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
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
  selectSubmitInput,
} from "./submitItemSlice";
import UploadDragDrop from "./UploadDragDrop";

const ItemSubmissionForm: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formInput = useAppSelector(selectSubmitInput);

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
        <DropdownButton
          dropdownName="submit-category"
          dropdownID="submit-category"
          options={SUBMIT_FOUND_CATEGORIES}
          onChange={handleCategoryChange}
          selected={formInput.category}
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
        <DropdownButton
          dropdownName="contact-method"
          dropdownID="contact-method"
          options={SUBMIT_FOUND_CONTACT_METHODS}
          onChange={handleContactMethodChange}
          selected={formInput.contactMethod}
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
