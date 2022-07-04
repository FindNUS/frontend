import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../../components/PopupMessage";
import { ENDPOINT_ITEM, ROUTE_HOME } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useAxios from "../../hooks/useAxios";
import { clearSubmitInputs, selectSubmitPayload } from "./submitItemSlice";

const ItemSubmissionPost: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const payload = useAppSelector(selectSubmitPayload) || {};
  console.log(payload);
  const [response, error, loading] = useAxios({
    method: "POST",
    url: ENDPOINT_ITEM,
    config: JSON.stringify(payload),
  });

  useEffect(() => {
    if (!response) return;

    if (!loading && response?.status === 200) {
      navigate(ROUTE_HOME);
    }

    // clear previous inputs from store
    dispatch(clearSubmitInputs());
  }, [response, loading]);

  return (
    <div className="submit-item__form">
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
