export const QUERY_SUBMIT_TYPE_KEY = "type";
export const QUERY_SUBMIT_TYPE_VALUE_FOUND = "found";
export const QUERY_SUBMIT_TYPE_VALUE_LOST = "lost";
export const QUERY_SUBMIT_TYPE_VALUE_EDIT = "edit";

export const TITLE_SUBMIT_DEFAULT = "Submit an Item";
export const TITLE_SUBMIT_FOUND = "Submit Found Item";
export const TITLE_SUBMIT_LOST = "Submit Lost Item";
export const TITLE_SUBMIT_EDIT = "Edit Submitted Item";

export const IMGUR_IMAGE_FORMATS = [
  "JPEG",
  "JPG",
  "PNG",
  "GIF",
  "APNG",
  "TIFF",
];
export const DRAG_DROP_MESSAGE = "Click to upload or drag and drop your image";

export interface DropdownOption {
  key: string;
  value: string;
}

export const DROPDOWN_DEFAULT_KEY = "select";
export const SUBMIT_FOUND_CATEGORIES: DropdownOption[] = [
  { value: "Select Category", key: DROPDOWN_DEFAULT_KEY },
  { value: "Etc", key: "Etc" },
  { value: "Cards", key: "Cards" },
  { value: "Notes", key: "Notes" },
  { value: "Electronics", key: "Electronics" },
  { value: "Bottles", key: "Bottles" },
];

export const CONTACT_METHOD_NUS_SECURITY_KEY = "nus_security";
export const CONTACT_METHOD_NUS_SECURITY_VALUE = "NUS Security";
export const CONTACT_METHOD_TELEGRAM_KEY = "telegram";
export const CONTACT_METHOD_TELEGRAM_VALUE = "Telegram";
export const CONTACT_METHOD_WHATSAPP_KEY = "whatsapp";
export const CONTACT_METHOD_WHATSAPP_VALUE = "WhatsApp";
export const CONTACT_METHOD_WECHAT_KEY = "wechat";
export const CONTACT_METHOD_WECHAT_VALUE = "WeChat";
export const CONTACT_METHOD_LINE_KEY = "line";
export const CONTACT_METHOD_LINE_VALUE = "Line";
export const CONTACT_METHOD_PHONE_KEY = "phone_number";
export const CONTACT_METHOD_PHONE_VALUE = "Phone Number";

export const SUBMIT_FOUND_CONTACT_METHODS: DropdownOption[] = [
  { value: "Select Contact Method", key: DROPDOWN_DEFAULT_KEY },
  {
    value: CONTACT_METHOD_NUS_SECURITY_VALUE,
    key: CONTACT_METHOD_NUS_SECURITY_KEY,
  },
  { value: CONTACT_METHOD_TELEGRAM_VALUE, key: CONTACT_METHOD_TELEGRAM_KEY },
  { value: CONTACT_METHOD_WHATSAPP_VALUE, key: CONTACT_METHOD_WHATSAPP_KEY },
  { value: CONTACT_METHOD_WECHAT_VALUE, key: CONTACT_METHOD_WECHAT_KEY },
  { value: CONTACT_METHOD_LINE_VALUE, key: CONTACT_METHOD_LINE_KEY },
  { value: CONTACT_METHOD_PHONE_VALUE, key: CONTACT_METHOD_PHONE_KEY },
];

// Form fields
export const FORM_FIELD_IDENTIFIER_NAME = "name";
export const FORM_FIELD_IDENTIFIER_CATEGORY = "category";
export const FORM_FIELD_IDENTIFIER_DATE = "date";
export const FORM_FIELD_IDENTIFIER_LOCATION = "location";
export const FORM_FIELD_IDENTIFIER_ADD_DETAILS = "additional-details";
export const FORM_FIELD_IDENTIFIER_CONTACT_METHOD = "contact-method";
export const FORM_FIELD_IDENTIFIER_CONTACT_DETAILS = "contact-details";
export const FORM_FIELD_IDENTIFIER_IMAGE = "image";

export const STORE_UPDATE_DELAY = 500; // ms

// Form input validation
export interface RequiredField {
  identifier: string;
  completed: boolean | undefined;
  required: boolean;
}

export const FORM_FIELD_STATUS_SUBMIT: RequiredField[] = [
  { identifier: FORM_FIELD_IDENTIFIER_NAME, completed: false, required: true },
  {
    identifier: FORM_FIELD_IDENTIFIER_CATEGORY,
    completed: false,
    required: true,
  },
  { identifier: FORM_FIELD_IDENTIFIER_DATE, completed: false, required: true },
  {
    identifier: FORM_FIELD_IDENTIFIER_LOCATION,
    completed: false,
    required: true,
  },
  {
    identifier: FORM_FIELD_IDENTIFIER_ADD_DETAILS,
    completed: undefined,
    required: false,
  },
  {
    identifier: FORM_FIELD_IDENTIFIER_CONTACT_METHOD,
    completed: undefined,
    required: false,
  },
  {
    identifier: FORM_FIELD_IDENTIFIER_CONTACT_DETAILS,
    completed: undefined,
    required: false,
  },
];

const currentDate = new Date();
const BROWSER_TIMEZONE_OFFSET = currentDate.getTimezoneOffset();
const ONE_MINUTE_MILISECONDS = 60000;
export const TIME_OFFSET = BROWSER_TIMEZONE_OFFSET * ONE_MINUTE_MILISECONDS;
const SUBMISSION_DATE_DAYS = 180; // days
export const SUBMISSION_DATE_RANGE =
  24 * 60 * ONE_MINUTE_MILISECONDS * SUBMISSION_DATE_DAYS; // miliseconds per day * days
export const OLDEST_ALLOWED_DATE = new Date(
  currentDate.setTime(currentDate.getTime() - SUBMISSION_DATE_RANGE)
);

export const E164_STANDARD_REGEX = /^\+?[1-9]\d{1,14}$/;

// Errors
export const FORM_FIELD_ERROR_NON_NUMERIC =
  "Enter at least one alphabet (must not be purely numeric)";
export const FORM_FIELD_ERROR_PHONE = "Enter valid contact details";
export const FORM_FIELD_ERROR_DATE = `Enter a valid date (Less than ${SUBMISSION_DATE_DAYS} days from today)`;
export const FORM_FIELD_ERROR_CATEGORY = "Choose a category";

export const FORM_FIELD_ERRORS = [
  {
    key: FORM_FIELD_IDENTIFIER_NAME,
    value: FORM_FIELD_ERROR_NON_NUMERIC,
  },
  { key: FORM_FIELD_IDENTIFIER_CATEGORY, value: FORM_FIELD_ERROR_CATEGORY },
  { key: FORM_FIELD_IDENTIFIER_DATE, value: FORM_FIELD_ERROR_DATE },
  { key: FORM_FIELD_IDENTIFIER_LOCATION, value: FORM_FIELD_ERROR_NON_NUMERIC },
  {
    key: FORM_FIELD_IDENTIFIER_ADD_DETAILS,
    value: FORM_FIELD_ERROR_NON_NUMERIC,
  },
  {
    key: FORM_FIELD_IDENTIFIER_CONTACT_DETAILS,
    value: FORM_FIELD_ERROR_PHONE,
  },
];
