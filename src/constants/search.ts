export const QUERY_SEARCH_ITEM_ID = "item";
export const QUERY_SEARCH_IS_PEEK = "peek";

export const SEARCH_BAR_PROMPT = "Search by keywords or location";

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
