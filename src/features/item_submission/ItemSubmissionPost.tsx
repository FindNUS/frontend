import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PopupMessage from "../../components/PopupMessage";
import {
  ENDPOINT_ITEM,
  QUERY_SUBMIT_TYPE_VALUE_EDIT,
  ROUTE_HOME,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useAxios from "../../hooks/useAxios";
import {
  clearSubmitInputs,
  selectSubmitDefaultValue,
  selectSubmitEditPayload,
  selectSubmitPayload,
} from "./submitItemSlice";

const ItemSubmissionPost: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditItem = searchParams.get(QUERY_SUBMIT_TYPE_VALUE_EDIT) === "true";
  const existingId = useAppSelector(selectSubmitDefaultValue)?.id;
  const payload = useAppSelector(selectSubmitPayload) || {};
  const editPayload = useAppSelector(selectSubmitEditPayload) || {};
  const [response, error, loading] = useAxios({
    method: isEditItem ? "PATCH" : "POST",
    url: isEditItem
      ? `${ENDPOINT_ITEM}?Id=${existingId}&User_id=${editPayload.User_id}`
      : ENDPOINT_ITEM,
    config: JSON.stringify(isEditItem ? editPayload : payload),
  });

  useEffect(() => {
    return () => {
      // clear previous inputs from store on unmount
      dispatch(clearSubmitInputs());
    };
  }, []);

  useEffect(() => {
    if (!response || loading) return;

    if (!loading && response?.status === 200) {
      navigate(ROUTE_HOME);
    }
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
