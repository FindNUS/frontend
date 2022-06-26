import React from "react";
import { useNavigate } from "react-router-dom";
import BigButton from "../../components/buttons/BigButton";
import {
  QUERY_SUBMIT_TYPE_KEY,
  QUERY_SUBMIT_TYPE_VALUE_FOUND,
  QUERY_SUBMIT_TYPE_VALUE_LOST,
  ROUTE_LOGIN,
  ROUTE_SUBMIT_ITEM_FORM,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAuthIsLoggedIn } from "../auth/authSlice";
import { updateMessage, updateStatus } from "../auth/loginSlice";

const ItemSubmissionType: React.FC = function () {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
  const dispatch = useAppDispatch();

  const handleClickFound = () =>
    navigate(
      `${ROUTE_SUBMIT_ITEM_FORM}?${QUERY_SUBMIT_TYPE_KEY}=${QUERY_SUBMIT_TYPE_VALUE_FOUND}`
    );
  const handleClickLost = () => {
    if (!isLoggedIn) {
      dispatch(updateStatus("error"));
      dispatch(updateMessage("You must be logged in to submit a lost item!"));
      return navigate(ROUTE_LOGIN);
    }
    navigate(
      `${ROUTE_SUBMIT_ITEM_FORM}?${QUERY_SUBMIT_TYPE_KEY}=${QUERY_SUBMIT_TYPE_VALUE_LOST}`
    );
  };

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
