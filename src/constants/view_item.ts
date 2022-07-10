export const QUERY_VIEW_ITEM_CATEGORY = "category";
export const QUERY_VIEW_ITEM_PER_PAGE = "items";
export const IMGUR_THUMBNAIL_SQUARE_SMALL = "s";
export const IMGUR_THUMBNAIL_SQUARE_BIG = "b";
export const IMGUR_THUMBNAIL_SMALL = "t";
export const IMGUR_THUMBNAIL_MEDUIM = "m";
export const IMGUR_THUMBNAIL_LARGE = "l";
export const IMGUR_THUMBNAIL_HUGE = "h";
export type IMGUR_THUMBNAIL_SIZES = "s" | "b" | "t" | "m" | "l" | "h";

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
  userID?: string;
}

export const DEFAULT_ITEMS_PER_PAGE = "10";
export const DROPDOWN_ITEMS_PER_PAGE = [
  { key: "5", value: "5" },
  { key: DEFAULT_ITEMS_PER_PAGE, value: DEFAULT_ITEMS_PER_PAGE },
  { key: "25", value: "25" },
  { key: "50", value: "50" },
];
