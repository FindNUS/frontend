import { DROPDOWN_DEFAULT_KEY, FormFoundItem } from "../constants";

const processFoundItemForAPI = (data: FormFoundItem) => {
  const { contactDetails, contactMethod, additionalDetails, imageBase64 } =
    data;
  return {
    Name: data.name,
    Date: data.date,
    Location: data.location,
    Category: data.category,
    ...(contactMethod !== DROPDOWN_DEFAULT_KEY && {
      Contact_method: contactMethod,
    }),
    ...(contactDetails !== "" && { Contact_details: contactDetails }),
    ...(additionalDetails !== "" && { Item_details: additionalDetails }),
    ...(imageBase64 !== "" && { Image_base64: imageBase64 }),
  };
};

export default processFoundItemForAPI;
