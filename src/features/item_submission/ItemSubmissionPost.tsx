import React from "react";
import PopupMessage from "../../components/PopupMessage";
import { ENDPOINT_ITEM_FOUND } from "../../constants";
import useAxiosPost from "../../hooks/useAxiosPost";

const processFoundItemForAPI = (data: {
  name: string;
  date: Date;
  location: string;
  category: string;
  contactMethod: string;
  contactDetails: string;
  itemDetails: string;
  base64URL: string;
}) => {
  return {
    Name: data.name,
    Date: data.date.toISOString(),
    Location: data.location,
    Category: data.category,
    Contact_method: data.contactMethod,
    Contact_details: data.contactDetails,
    Item_details: data.itemDetails,
    Image_base64: data.base64URL, // convert base64 URL to base64 string
  };
};

const DUMMY_PAYLOAD = {
  name: "Water Bottle",
  date: new Date("2019-08-24T14:15:22.000Z"),
  location: "E4A DSA Lab",
  category: "Cards",
  contactMethod: "Telegram",
  contactDetails: "FindNUS",
  itemDetails: "Blue, with a sticker and broken handle",
  base64URL:
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
};

const ItemSubmissionPost: React.FC = function () {
  const [response, error, loading] = useAxiosPost({
    url: ENDPOINT_ITEM_FOUND,
    payload: JSON.stringify(processFoundItemForAPI(DUMMY_PAYLOAD)),
  });

  // TODO: Redirect on success to appropriate page

  return (
    <div className="submit-item__form">
      {response && JSON.stringify(response.data)}
      {loading && (
        <PopupMessage status="loading" message="Submitting item..." />
      )}
      {error && !loading && !response && (
        <PopupMessage
          status="error"
          message={`
              Item submission failed: ${JSON.stringify(error.message)}
            `}
        />
      )}
    </div>
  );
};

export default ItemSubmissionPost;
