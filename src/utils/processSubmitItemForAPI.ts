import { DROPDOWN_DEFAULT_KEY, FormSubmitItem } from "../constants";

const processSubmitItemForAPI = (data: Partial<FormSubmitItem>) => {
  const {
    name,
    date,
    location,
    category,
    contactDetails,
    contactMethod,
    additionalDetails,
    imageBase64,
    userID,
  } = data;

  return {
    ...(name && { Name: name }),
    ...(date && { Date: date }),
    ...(location && { Location: location }),
    ...(category && { Category: category }),
    ...(contactMethod !== DROPDOWN_DEFAULT_KEY && {
      Contact_method: contactMethod,
    }),
    ...(contactDetails && { Contact_details: contactDetails }),
    ...(additionalDetails && { Item_details: additionalDetails }),
    ...(imageBase64 && { Image_base64: imageBase64 }),
    ...(userID && { User_id: userID }),
  };
};

export type APIItemType = ReturnType<typeof processSubmitItemForAPI>;
export default processSubmitItemForAPI;
