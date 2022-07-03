export const OTP_REQUEST_TIMEOUT = 60000; // ms = 1 min
export const RECAPTCHA_CONTAINER_ID = "recaptcha-container";
export const RECAPTCHA_CONTAINER_ELEMENT = `<div id="${RECAPTCHA_CONTAINER_ID}"></div>`;
export const REGEX_E164_NUMBER = /^\+[1-9]\d{1,14}$/;
export const REGEX_MOBILE_SG = /^(8|9)\d{7}$/;
export const COUNTRY_CODE_SG = "65";
export const AUTH_ERROR_INVALID_PHONE =
  "Please enter an 8-digit Singapore mobile number or number with country code.";
export const NEW_USER_THRESHOLD = 5000; // ms
