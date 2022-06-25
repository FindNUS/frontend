import React from "react";
import { useNavigate } from "react-router-dom";
import BigButton from "../../components/buttons/BigButton";
import {
  QUERY_SUBMIT_TYPE_KEY,
  QUERY_SUBMIT_TYPE_VALUE_FOUND,
  QUERY_SUBMIT_TYPE_VALUE_LOST,
  ROUTE_SUBMIT_ITEM_FORM,
} from "../../constants";

const ItemSubmissionType: React.FC = function () {
  const navigate = useNavigate();

  const handleClickFound = () =>
    navigate(
      `${ROUTE_SUBMIT_ITEM_FORM}?${QUERY_SUBMIT_TYPE_KEY}=${QUERY_SUBMIT_TYPE_VALUE_FOUND}`
    );
  const handleClickLost = () =>
    navigate(
      `${ROUTE_SUBMIT_ITEM_FORM}?${QUERY_SUBMIT_TYPE_KEY}=${QUERY_SUBMIT_TYPE_VALUE_LOST}`
    );

  return (
    <div className="submit-item__type">
      <BigButton
        colour="tertiary"
        text="Found item"
        onClick={handleClickFound}
      />
      <BigButton
        colour="secondary"
        text="Lost item"
        onClick={handleClickLost}
      />
    </div>
  );
};

export default ItemSubmissionType;
