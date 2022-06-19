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
export const SUBMIT_FOUND_CONTACT_METHODS: DropdownOption[] = [
  { value: "Select Contact Method", key: DROPDOWN_DEFAULT_KEY },
  { value: "NUS Security", key: "nus_security" },
  { value: "Telegram", key: "telegram" },
  { value: "WhatsApp", key: "whatsapp" },
  { value: "WeChat", key: "wechat" },
  { value: "Line", key: "line" },
  { value: "Phone Number", key: "phone_number" },
];
