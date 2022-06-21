import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";
import DropdownButton from "../../components/form/DropdownButton";
import FormField from "../../components/form/FormField";
import {
  DROPDOWN_DEFAULT_KEY,
  CONTACT_METHOD_NUS_SECURITY_KEY,
  CONTACT_METHOD_WHATSAPP_KEY,
  CONTACT_METHOD_PHONE_KEY,
  E164_STANDARD_REGEX,
  FORM_FIELD_IDENTIFIER_ADD_DETAILS,
  FORM_FIELD_IDENTIFIER_CATEGORY,
  FORM_FIELD_IDENTIFIER_CONTACT_DETAILS,
  FORM_FIELD_IDENTIFIER_CONTACT_METHOD,
  FORM_FIELD_IDENTIFIER_DATE,
  FORM_FIELD_IDENTIFIER_LOCATION,
  FORM_FIELD_IDENTIFIER_NAME,
  OLDEST_ALLOWED_DATE,
  STORE_UPDATE_DELAY,
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
  setSubmitFormInputStatus,
  selectSubmitFormInputStatus,
} from "./submitItemSlice";
import UploadDragDrop from "./UploadDragDrop";

const ItemSubmissionForm: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formInput = useAppSelector(selectSubmitInput);
  const formInputStatus = useAppSelector(selectSubmitFormInputStatus);

  /**
   * Helper function to update form field corresponding to identifier in store.
   * @param identifier The string which corresponds to the form field.
   * @param completed If the field is required to be filled, set boolean value,
   *                  otherwise undefined.
   */
  const setIdentifierStatus = (
    identifier: string,
    completed: boolean | undefined
  ) =>
    dispatch(
      setSubmitFormInputStatus({
        identifier,
        completed,
      })
    );

  /**
   * Validate form input data for various categories.
   */
  const updateFormInputStatus = () => {
    // 1. validate name input
    setIdentifierStatus(
      FORM_FIELD_IDENTIFIER_NAME,
      formInput.name.trim() !== "" && Number.isNaN(+formInput.name)
    );
    // 2. validate category input
    formInput.category !== DROPDOWN_DEFAULT_KEY
      ? setIdentifierStatus(FORM_FIELD_IDENTIFIER_CATEGORY, true)
      : setIdentifierStatus(FORM_FIELD_IDENTIFIER_CATEGORY, false) &&
        dispatch(setSubmitCategory(DROPDOWN_DEFAULT_KEY));
    // 3. validate date input
    setIdentifierStatus(
      FORM_FIELD_IDENTIFIER_DATE,
      new Date(formInput.date) <= new Date() &&
        new Date(formInput.date) > OLDEST_ALLOWED_DATE
    );
    // 4. validate location input
    setIdentifierStatus(
      FORM_FIELD_IDENTIFIER_LOCATION,
      formInput.location.trim() !== "" && Number.isNaN(+formInput.location)
    );
    // 5. validate contact method
    switch (formInput.contactMethod) {
      case DROPDOWN_DEFAULT_KEY:
        // No requirement to input contact details
        setIdentifierStatus(FORM_FIELD_IDENTIFIER_CONTACT_METHOD, undefined);
        setIdentifierStatus(FORM_FIELD_IDENTIFIER_CONTACT_DETAILS, undefined);
        break;
      case CONTACT_METHOD_NUS_SECURITY_KEY:
        // No requirement to input contact details
        setIdentifierStatus(FORM_FIELD_IDENTIFIER_CONTACT_METHOD, true);
        setIdentifierStatus(FORM_FIELD_IDENTIFIER_CONTACT_DETAILS, true);
        break;
      default:
        // Require user to fill in contact details
        setIdentifierStatus(FORM_FIELD_IDENTIFIER_CONTACT_METHOD, true);
        setIdentifierStatus(FORM_FIELD_IDENTIFIER_CONTACT_DETAILS, false);
        break;
    }
    // 6. validate contact details (if required)
    // verify phone number matches E164 standard, if WhatsApp or phone number
    const contactMethodValid =
      formInput.contactMethod === CONTACT_METHOD_PHONE_KEY ||
      formInput.contactMethod === CONTACT_METHOD_WHATSAPP_KEY
        ? !!formInput.contactDetails.trim().match(E164_STANDARD_REGEX)
        : formInput.contactDetails.trim() !== "";

    formInput.contactMethod !== DROPDOWN_DEFAULT_KEY &&
    formInput.contactMethod !== CONTACT_METHOD_NUS_SECURITY_KEY
      ? setIdentifierStatus(
          FORM_FIELD_IDENTIFIER_CONTACT_DETAILS,
          contactMethodValid
        )
      : dispatch(setSubmitContactDetails(""));

    // 7. validate additional details
    formInput.additionalDetails.trim()
      ? setIdentifierStatus(
          FORM_FIELD_IDENTIFIER_ADD_DETAILS,
          Number.isNaN(+formInput.additionalDetails)
        )
      : setIdentifierStatus(FORM_FIELD_IDENTIFIER_ADD_DETAILS, undefined);
  };

  // Form input validation
  // Validation is run STORE_UPDATE_DELAY ms after the last change
  useEffect(() => {
    const identifier = setTimeout(
      () => updateFormInputStatus(),
      STORE_UPDATE_DELAY
    );
    return () => clearTimeout(identifier);
  }, [formInput]);

  /**
   * Used for item submission, updates form input in store, generates the submit
   * payload and redirects the user to the POST page.
   *
   * @param ev The synthetic event triggerred by a form submit.
   */
  const handleSubmitForm = (ev: React.FormEvent) => {
    ev.preventDefault();
    // Validate form inputs before submission
    updateFormInputStatus();

    // return if inputs are not valid
    const formIsValid = formInputStatus
      .map((input) => {
        const { completed, required } = input;
        // input is required by default
        if (required && !completed) return false;
        // input is not required by default but must be filled in (contact details)
        if (!required && completed !== undefined && !completed) return false;
        // input is optional
        if (!required && completed === undefined) return true;
        // input is valid
        return true;
      })
      .reduce((acc, status) => acc && status, true);
    if (!formIsValid) return;

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
        {/* Enable contact details as required */}
        {formInput.contactMethod !== DROPDOWN_DEFAULT_KEY &&
          formInput.contactMethod !== CONTACT_METHOD_NUS_SECURITY_KEY && (
            <FormField
              onChange={handleContactDetailsChange}
              labelContent="Contact details"
              disabled={false}
            />
          )}
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
