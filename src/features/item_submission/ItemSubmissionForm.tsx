import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButtonText from "../../components/buttons/BackButtonText";
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
  FORM_FIELD_ERRORS,
  ROUTE_SUBMIT_ITEM_TYPE,
  QUERY_SUBMIT_TYPE_KEY,
  QUERY_SUBMIT_TYPE_VALUE_LOST,
  ROUTE_HOME,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import getArrayObjectValueFromKey from "../../utils/getArrayObjectValueFromKey";
import generateFormErrorStatus from "./generateFormErrorStatus";
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
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const submitType = searchParams.get(QUERY_SUBMIT_TYPE_KEY);
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) return; // currently logged in
    // user is logged out, redirect to home page
    if (submitType === QUERY_SUBMIT_TYPE_VALUE_LOST) navigate(ROUTE_HOME);
  }, [auth.currentUser]);

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
    const formHasErrors = generateFormErrorStatus(formInputStatus).reduce(
      (acc, status) => acc || status.error,
      false
    );
    setAttemptedSubmit(true);
    if (formHasErrors) return;

    const userID = auth.currentUser?.uid;
    dispatch(generateSubmitPayload(userID));
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

  const errors = generateFormErrorStatus(formInputStatus);
  const getInputValueByIdentifier = (identifier: string) => {
    switch (identifier) {
      case FORM_FIELD_IDENTIFIER_NAME:
        return formInput.name;
      case FORM_FIELD_IDENTIFIER_CATEGORY:
        return formInput.category;
      case FORM_FIELD_IDENTIFIER_DATE:
        return formInput.date;
      case FORM_FIELD_IDENTIFIER_LOCATION:
        return formInput.location;
      case FORM_FIELD_IDENTIFIER_ADD_DETAILS:
        return formInput.additionalDetails;
      case FORM_FIELD_IDENTIFIER_CONTACT_METHOD:
        return formInput.contactMethod;
      case FORM_FIELD_IDENTIFIER_CONTACT_DETAILS:
        return formInput.contactDetails;
    }
  };

  const generateFormError = (identifier: string) => {
    const value = getInputValueByIdentifier(identifier);
    // prevent error display on form load
    switch (identifier) {
      case FORM_FIELD_IDENTIFIER_CATEGORY:
      case FORM_FIELD_IDENTIFIER_CONTACT_METHOD:
        if (value === DROPDOWN_DEFAULT_KEY && !attemptedSubmit)
          return undefined;
        break;
      default:
        if (value === "" && !attemptedSubmit) return undefined;
    }

    return {
      status: errors.filter((error) => error.identifier === identifier)[0]
        .error,
      error: getArrayObjectValueFromKey(FORM_FIELD_ERRORS, identifier),
    };
  };

  const handleBack = () => navigate(ROUTE_SUBMIT_ITEM_TYPE);

  return (
    <form className="submit-item__form" onSubmit={handleSubmitForm}>
      <div className="submit-item__form--fields">
        <BackButtonText
          message="Select item type"
          onClick={handleBack}
          className="submit-item__form--back"
        />
        <FormField
          onChange={handleDescriptionChange}
          labelContent="Item Description"
          disabled={false}
          isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_NAME)}
        />
        <DropdownButton
          dropdownName="submit-category"
          dropdownID="submit-category"
          options={SUBMIT_FOUND_CATEGORIES}
          onChange={handleCategoryChange}
          selected={formInput.category}
          isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_CATEGORY)}
        />
        <FormField
          onChange={handleLocationChange}
          labelContent="Location"
          disabled={false}
          isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_LOCATION)}
        />
        <FormField
          onChange={handleDateChange}
          labelContent="Date"
          type="date"
          disabled={false}
          isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_DATE)}
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
              isInvalid={generateFormError(
                FORM_FIELD_IDENTIFIER_CONTACT_DETAILS
              )}
            />
          )}
        <FormField
          onChange={handleAdditionalDetailsChange}
          labelContent="Additional details"
          type="textarea"
          disabled={false}
          isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_ADD_DETAILS)}
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
