export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const PEEK_DEFAULT_LIMIT = 20;
export const ENDPOINT_DEBUG_PING = `${API_BASE_URL}/debug/ping`;
export const ENDPOINT_DEBUG_CHECK_AUTH = `${API_BASE_URL}/debug/checkAuth`;
export const ENDPOINT_DEBUG_GET_DEMO_ITEM = `${API_BASE_URL}/debug/getDemoItem`;
export const ENDPOINT_ITEM = `${API_BASE_URL}/item`;
export const ENDPOINT_PEEK = `${API_BASE_URL}/item/peek`;
export const ENDPOINT_SEARCH = `${API_BASE_URL}/search`;

export interface FormFoundItem {
  name: string;
  date: string;
  location: string;
  category: string;
  contactMethod?: string;
  contactDetails?: string;
  additionalDetails?: string;
  imageBase64?: string;
}

export interface APIItemGET {
  Id: string;
  Name: string;
  Date: string;
  Location: string;
  Category: string;
  Contact_method?: string;
  Contact_details?: string;
  Item_details?: string;
  Image_url?: string;
  User_id?: string;
}
