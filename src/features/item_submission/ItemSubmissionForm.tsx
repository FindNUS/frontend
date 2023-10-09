import {
  PhoneAuthProvider,
  reauthenticateWithCredential,
  User,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { firebaseAuth } from "../../app/firebase";
import BackButtonText from "../../components/buttons/BackButtonText";
import Button from "../../components/buttons/Button";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";
import Checkbox from "../../components/form/Checkbox";
import DropdownButton from "../../components/form/DropdownButton";
import FormField from "../../components/form/FormField";
import PopupMessage from "../../components/PopupMessage";
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
  // OLDEST_ALLOWED_DATE,
  STORE_UPDATE_DELAY,
  ROUTE_SUBMIT_ITEM_POST,
  SUBMIT_FOUND_CATEGORIES,
  SUBMIT_FOUND_CONTACT_METHODS,
  FORM_FIELD_ERRORS,
  ROUTE_SUBMIT_ITEM_TYPE,
  QUERY_SUBMIT_TYPE_KEY,
  QUERY_SUBMIT_TYPE_VALUE_LOST,
  ROUTE_HOME,
  TIME_OFFSET,
  QUERY_SUBMIT_TYPE_VALUE_EDIT,
  ROUTE_DASHBOARD_ITEMS,
  FORM_FIELD_IDENTIFIER_IMAGE,
  ROUTE_LOGIN_FIRST_TIME,
  DISPLAY_FILTER_DATE_START,
  DISPLAY_FILTER_DATE_END,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import getArrayObjectKeyFromValue from "../../utils/getArrayObjectKeyFromValue";
import getArrayObjectValueFromKey from "../../utils/getArrayObjectValueFromKey";
import { selectAuthVerificationId } from "../auth/authSlice";
import { selectOTP } from "../auth/loginSlice";
import VerifyEmail from "../auth/VerifyEmail";
import EmbeddedMap from "../geocoding/EmbeddedMap";
import GeocodingSearch from "../geocoding/GeocodingSearch";
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
  selectSubmitDefaultValue,
  clearSubmitInputs,
  generateEditPayload,
  setSubmitDefaultValue,
  setSubmitPlusCode,
  setSubmitLookout,
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
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const [fieldEdited, setFieldEdited] = useState({
    [FORM_FIELD_IDENTIFIER_NAME]: false,
    [FORM_FIELD_IDENTIFIER_CATEGORY]: false,
    [FORM_FIELD_IDENTIFIER_DATE]: false,
    [FORM_FIELD_IDENTIFIER_LOCATION]: false,
    [FORM_FIELD_IDENTIFIER_CONTACT_METHOD]: false,
    [FORM_FIELD_IDENTIFIER_CONTACT_DETAILS]: false,
    [FORM_FIELD_IDENTIFIER_ADD_DETAILS]: false,
    [FORM_FIELD_IDENTIFIER_IMAGE]: false,
  });

  // load values if editing an item
  const isEdit = submitType === QUERY_SUBMIT_TYPE_VALUE_EDIT;
  const isLost = submitType === QUERY_SUBMIT_TYPE_VALUE_LOST;

  useEffect(() => {
    if (firebaseAuth.currentUser) return; // currently logged in
    // user is logged out, redirect to home page
    if (isLost || isEdit) navigate(ROUTE_HOME);
  }, [firebaseAuth.currentUser]);

  const defaultValue = useAppSelector(selectSubmitDefaultValue);
  useEffect(() => {
    dispatch(clearSubmitInputs());
    if (isLost) dispatch(setSubmitLookout(false));
    if (!defaultValue || !isEdit) {
      dispatch(setSubmitDefaultValue(undefined));
      return;
    }

    // set dropdown menu selected option
    const {
      category,
      contactMethod,
      name,
      contactDetails,
      additionalDetails,
      location,
      date,
      lookout,
    } = defaultValue;

    if (name) dispatch(setSubmitName(name));
    if (date) dispatch(setSubmitDate(date));
    if (location) dispatch(setSubmitLocation(location));
    if (additionalDetails)
      dispatch(setSubmitAdditionalDetails(additionalDetails));
    if (contactDetails) dispatch(setSubmitContactDetails(contactDetails));
    if (category) dispatch(setSubmitCategory(category));
    if (contactMethod) {
      const contactMethodKey = getArrayObjectKeyFromValue(
        SUBMIT_FOUND_CONTACT_METHODS,
        contactMethod
      );
      dispatch(setSubmitContactMethod(contactMethodKey));
    }
    if (lookout !== undefined) dispatch(setSubmitLookout(lookout));
  }, []);

  // Geocoding
  const [showGeocodingResults, setShowGeocodingResults] = useState(true);

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
      new Date(formInput.date) <= DISPLAY_FILTER_DATE_END &&
        new Date(formInput.date) > DISPLAY_FILTER_DATE_START
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

    // POST lost item
    if (isLost) {
      const userID = (firebaseAuth.currentUser as User).uid as string;
      dispatch(generateSubmitPayload(userID));
    } else if (isEdit) {
      // PATCH lost item
      const userID = (firebaseAuth.currentUser as User).uid as string;
      const editedFields = {
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_NAME] && {
          name: formInput.name,
        }),
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_CATEGORY] && {
          category: formInput.category,
        }),
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_DATE] && {
          date: formInput.date,
        }),
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_LOCATION] && {
          location: formInput.location,
        }),
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_ADD_DETAILS] && {
          additionalDetails: formInput.additionalDetails,
        }),
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_CONTACT_DETAILS] && {
          contactDetails: formInput.contactDetails,
        }),
        ...(fieldEdited[FORM_FIELD_IDENTIFIER_CONTACT_METHOD] && {
          contactMethod: formInput.contactMethod,
        }),
      };

      dispatch(
        generateEditPayload({
          userID,
          itemID: defaultValue?.id as string,
          editedFields,
        })
      );
    } else {
      // POST found item
      dispatch(generateSubmitPayload());
    }

    navigate(
      `${ROUTE_SUBMIT_ITEM_POST}?${QUERY_SUBMIT_TYPE_VALUE_EDIT}=${isEdit}`
    );
  };

  const handleDescriptionChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_NAME]: defaultValue?.name !== value && !!value,
      };
    });
    dispatch(setSubmitName(value));
  };
  const handleLocationChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_LOCATION]:
          defaultValue?.location !== value && !!value,
      };
    });
    dispatch(setSubmitLocation(value));
    setShowGeocodingResults(true);
  };
  const handleGeocodeChange = (ev: React.FormEvent) => {
    const item = ev.currentTarget as HTMLDivElement;
    const pluscode = item.getAttribute("data-pluscode") as string;
    dispatch(setSubmitPlusCode(pluscode));
    setShowGeocodingResults(false);
  };
  const handleDateChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    const initialDate = new Date(value);
    const timezoneAdjustedTime = initialDate.getTime() + TIME_OFFSET;
    const timezoneAdjustedDate = new Date(timezoneAdjustedTime).toISOString();
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_DATE]: defaultValue?.date !== value && !!value,
      };
    });
    dispatch(setSubmitDate(timezoneAdjustedDate));
  };
  const handleAdditionalDetailsChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_ADD_DETAILS]:
          defaultValue?.additionalDetails !== value && !!value,
      };
    });
    dispatch(setSubmitAdditionalDetails(value));
  };
  const handleContactDetailsChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_CONTACT_DETAILS]:
          defaultValue?.contactDetails !== value && !!value,
      };
    });
    dispatch(setSubmitContactDetails(value));
  };
  const handleImageURLChange = (url: string) => {
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_IMAGE]:
          imageUploadRef.current?.getAttribute("data-edited") === "true",
      };
    });
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
    const defaultContactMethodKey = defaultValue?.contactMethod;
    const defaultContactMethod = defaultContactMethodKey
      ? getArrayObjectKeyFromValue(
          SUBMIT_FOUND_CONTACT_METHODS,
          defaultContactMethodKey
        )
      : null;
    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_CONTACT_METHOD]: defaultContactMethod !== value,
      };
    });
    dispatch(setSubmitContactMethod(value));
  };
  const handleCategoryChange = (ev: React.FormEvent) => {
    const { value } = ev.target as HTMLInputElement;
    const defaultCategoryKey = defaultValue?.category;
    const defaultCategory = defaultCategoryKey
      ? getArrayObjectValueFromKey(SUBMIT_FOUND_CATEGORIES, defaultCategoryKey)
      : null;

    setFieldEdited((prev) => {
      return {
        ...prev,
        [FORM_FIELD_IDENTIFIER_CATEGORY]: defaultCategory !== value,
      };
    });
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

  const handleBack = () => {
    if (isEdit) return navigate(ROUTE_DASHBOARD_ITEMS);
    navigate(ROUTE_SUBMIT_ITEM_TYPE);
  };

  // lookout
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const user = firebaseAuth.currentUser;
  const hasEmail = !!user?.email;
  const isEmailVerified = user?.emailVerified;
  const verificationId = useAppSelector(selectAuthVerificationId);
  const userOTP = useAppSelector(selectOTP);

  const handleAddEmail = async () => {
    if (!user || !verificationId) return navigate(ROUTE_HOME);
    // refresh user status to prevent auth/requires-recent-login
    const credentials = PhoneAuthProvider.credential(verificationId, userOTP);
    await reauthenticateWithCredential(user, credentials);
    navigate(ROUTE_LOGIN_FIRST_TIME);
  };

  const handleLookoutChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = ev.target.checked;
    if (!hasEmail) return setShowAddEmail(true);
    if (!isEmailVerified) return setShowVerifyEmail(true);
    dispatch(setSubmitLookout(isChecked));
  };

  return (
    <form className="submit-item__form" onSubmit={handleSubmitForm}>
      <BackButtonText
        message={isEdit ? "Return to dashboard" : "Select item type"}
        onClick={handleBack}
        className="submit-item__form--back"
      />
      <div className="submit-item__form-container">
        <div className="submit-item__form--fields">
          <FormField
            onChange={handleDescriptionChange}
            labelContent="Item Description"
            disabled={false}
            isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_NAME)}
            defaultValue={defaultValue?.name}
          />
          <DropdownButton
            dropdownName="submit-category"
            dropdownID="submit-category"
            options={SUBMIT_FOUND_CATEGORIES}
            onChange={handleCategoryChange}
            isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_CATEGORY)}
            selected={formInput.category}
          />
          <div className="geocoding__wrapper">
            <FormField
              onChange={handleLocationChange}
              labelContent="Location"
              disabled={false}
              isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_LOCATION)}
              defaultValue={defaultValue?.location}
            />
            <GeocodingSearch
              showResults={showGeocodingResults || !formInput.pluscode}
              query={formInput.location}
              setGeocode={handleGeocodeChange}
            />
            {formInput.pluscode && (
              <EmbeddedMap
                plusCode={formInput.pluscode}
                className="submit-item__form--map"
              />
            )}
          </div>
          <FormField
            onChange={handleDateChange}
            labelContent="Date"
            type="date"
            disabled={false}
            isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_DATE)}
            defaultValue={defaultValue?.date}
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
                defaultValue={defaultValue?.contactDetails}
              />
            )}
          <FormField
            onChange={handleAdditionalDetailsChange}
            labelContent="Additional details"
            type="textarea"
            disabled={false}
            isInvalid={generateFormError(FORM_FIELD_IDENTIFIER_ADD_DETAILS)}
            defaultValue={defaultValue?.additionalDetails}
          />
          {isLost && (
            <>
              <Checkbox
                label="Subscribe to lookout notifications"
                onChange={handleLookoutChange}
                checked={formInput.lookout}
              />
              {showAddEmail && (
                <>
                  <PopupMessage
                    status="error"
                    message="You need to add your email first!"
                  />
                  <Button
                    class="btn btn--tertiary"
                    text="Click here to add your email"
                    onClick={handleAddEmail}
                  />
                </>
              )}
              {showVerifyEmail && (
                <VerifyEmail user={firebaseAuth.currentUser as User} />
              )}
            </>
          )}
        </div>
        <UploadDragDrop
          className="submit-item__form--upload"
          onImageUpload={handleImageURLChange}
          defaultValue={defaultValue?.image.url}
          ref={imageUploadRef}
        />
      </div>
      <ButtonSubmit
        className={`btn btn--primary ${
          formInput.lookout && (!hasEmail || !isEmailVerified)
            ? "btn--disabled"
            : ""
        }`}
        text="Submit"
      />
    </form>
  );
};

export default ItemSubmissionForm;
