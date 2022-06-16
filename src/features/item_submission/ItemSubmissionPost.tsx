import React from "react";
import PopupMessage from "../../components/PopupMessage";
import { ENDPOINT_ITEM_FOUND } from "../../constants";
import { useAppSelector } from "../../hooks";
import useAxiosPost from "../../hooks/useAxiosPost";
import { selectSubmitPayload } from "./submitItemSlice";

const ItemSubmissionPost: React.FC = function () {
  const payload = useAppSelector(selectSubmitPayload) || {};
  const [response, error, loading] = useAxiosPost({
    url: ENDPOINT_ITEM_FOUND,
    payload: JSON.stringify(payload),
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
              Item submission failed: ${JSON.stringify(error.response?.data)}
            `}
        />
      )}
    </div>
  );
};

export default ItemSubmissionPost;
