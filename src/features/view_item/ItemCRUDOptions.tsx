import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import {
  ENDPOINT_ITEM,
  HTTPRequestMethods,
  LNFItem,
  ROUTE_DASHBOARD_ITEMS,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useAxios from "../../hooks/useAxios";
import { selectAuthToken } from "../auth/authSlice";
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
    alert("Button is non-functional!");
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
