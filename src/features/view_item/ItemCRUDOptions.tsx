import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import {
  ENDPOINT_ITEM,
  HTTPRequestMethods,
  LNFItem,
  QUERY_SUBMIT_TYPE_KEY,
  QUERY_SUBMIT_TYPE_VALUE_EDIT,
  ROUTE_DASHBOARD_ITEMS,
  ROUTE_SUBMIT_ITEM_FORM,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useAxios from "../../hooks/useAxios";
import { selectAuthToken } from "../auth/authSlice";
import { setSubmitDefaultValue } from "../item_submission/submitItemSlice";
import { setViewLoading, updateViewStore } from "./viewItemSlice";

interface ItemCRUDOptionsProps {
  item: LNFItem;
  userID: string;
}

const ItemCRUDOptions: React.FC<ItemCRUDOptionsProps> = function (
  props: ItemCRUDOptionsProps
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { item, userID } = props;
  const idToken = useAppSelector(selectAuthToken);
  const [methodCRUD, setMethodCRUD] = useState<HTTPRequestMethods>();
  const [urlCRUD, setUrlCRUD] = useState<string>();
  const [configCRUD, setConfigCRUD] = useState<string>();

  const [response, error, loading] = useAxios({
    method: methodCRUD,
    url: urlCRUD,
    config: configCRUD,
  });

  // update viewItem store
  useEffect(() => {
    const errorStatus = error ? "error" : undefined;
    const message = error?.message;
    dispatch(
      updateViewStore({
        isLoading: loading,
        status: errorStatus,
        message,
      })
    );
  }, [loading, error]);

  const handleItemEdit = () => {
    const {
      name,
      date,
      location,
      category,
      contactDetails,
      contactMethod,
      additionalDetails,
      imageUrl,
      id,
      pluscode,
    } = item;

    const [itemDate, itemMonth, itemYear] = date.split("/");
    const formFieldDate = `${itemYear}-${itemMonth}-${itemDate}`;

    dispatch(setSubmitDefaultValue(undefined));
    dispatch(
      setSubmitDefaultValue({
        name,
        date: formFieldDate,
        location,
        category,
        contactDetails: contactDetails ?? "",
        contactMethod: contactMethod ?? "",
        additionalDetails: additionalDetails ?? "",
        image: {
          url: imageUrl,
          result: "success",
          error: undefined,
          loading: false,
        },
        id,
        pluscode: pluscode ?? "",
      })
    );

    navigate(
      `${ROUTE_SUBMIT_ITEM_FORM}?${QUERY_SUBMIT_TYPE_KEY}=${QUERY_SUBMIT_TYPE_VALUE_EDIT}`
    );
  };

  const handleItemDelete = () => {
    const proceed = confirm(
      `Are you sure you want to delete the following item?\nName: ${item.name}\nID: ${item.id}`
    );
    if (!proceed) return;

    dispatch(setViewLoading(true));
    const url = `${ENDPOINT_ITEM}?Id=${item.id}&User_id=${userID}`;
    const config = {
      headers: {
        Authorization: idToken,
      },
    };

    setMethodCRUD("DELETE");
    setConfigCRUD(JSON.stringify(config));
    setUrlCRUD(url);
  };

  useEffect(() => {
    // wait for item update to be completed
    if (loading || !response) return;

    // item update complete
    if (response.status === 200) {
      navigate(ROUTE_DASHBOARD_ITEMS);
      dispatch(setViewLoading(false));
      return;
    }
  }, [loading, response]);

  return (
    <div className="crud-options">
      <Button class="btn btn--tertiary" text="Edit" onClick={handleItemEdit} />
      <Button
        class="btn btn--secondary"
        text="Delete"
        onClick={handleItemDelete}
      />
    </div>
  );
};

export default ItemCRUDOptions;
