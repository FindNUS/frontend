export const QUERY_SEARCH_ITEM_ID = "item";

export interface LNFItem {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  contactMethod?: string;
  contactDetails?: string;
  additionalDetails?: string;
  imageUrl?: string;
}
