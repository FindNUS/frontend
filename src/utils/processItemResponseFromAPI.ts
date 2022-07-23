import { APIItemGET } from "../constants";
import getContactMethodValue from "./getContactMethodValue";

const processItemResponseFromAPI = (data: APIItemGET) => {
  const {
    Id: id,
    Name: name,
    Date: date,
    Location: location,
    Category: category,
    Contact_method: contactMethod,
    Contact_details: contactDetails,
    Item_details: additionalDetails,
    Image_url: imageUrl,
    User_id: userID,
    Pluscode: pluscode,
    Lookout: lookout,
  } = data;

  return {
    id,
    name,
    date: new Date(date).toLocaleDateString("en-SG"),
    location,
    category,
    ...(contactMethod && {
      contactMethod: getContactMethodValue(contactMethod),
    }),
    ...(contactDetails && { contactDetails }),
    ...(additionalDetails && { additionalDetails }),
    ...(imageUrl && { imageUrl }),
    ...(userID && { userID }),
    ...(pluscode && { pluscode }),
    ...(lookout && { lookout }),
  };
};

export default processItemResponseFromAPI;
