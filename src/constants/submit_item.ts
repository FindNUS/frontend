export const IMGUR_IMAGE_FORMATS = [
  "JPEG",
  "JPG",
  "PNG",
  "GIF",
  "APNG",
  "TIFF",
];
export const DRAG_DROP_MESSAGE = `Click to upload or drag and drop your image`;

export interface DropdownOption {
  key: string;
  value: string;
}

export const DROPDOWN_DEFAULT_KEY = "Select";
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
