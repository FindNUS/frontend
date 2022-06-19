export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const ENDPOINT_ITEM = `${API_BASE_URL}/item`;

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
