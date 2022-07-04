import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ENDPOINT_ITEM,
  APIItemGET,
  QUERY_SEARCH_ITEM_ID,
  ROUTE_SEARCH,
  LNFItem,
  QUERY_SEARCH_IS_PEEK,
  ROUTE_HOME,
  QUERY_SEARCH_DASHBOARD,
  ROUTE_DASHBOARD_ITEMS,
} from "../../constants";
import processItemResponseFromAPI from "../../utils/processItemResponseFromAPI";
import LostAndFoundItem from "./LostAndFoundItem";
import BackButtonText from "../../components/buttons/BackButtonText";
import { firebaseAuth } from "../../app/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectViewLoading, updateViewStore } from "./viewItemSlice";
import PopupMessage from "../../components/PopupMessage";
import Loading from "../../components/Loading";
import ItemCRUDOptions from "./ItemCRUDOptions";
import useAxios from "../../hooks/useAxios";

const ViewItem: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get(QUERY_SEARCH_ITEM_ID);
  const fromPeek = searchParams.get(QUERY_SEARCH_IS_PEEK) === "true";
  const fromDashboard = searchParams.get(QUERY_SEARCH_DASHBOARD) === "true";

  const currentUser = firebaseAuth.currentUser?.uid;

  const url = fromDashboard
    ? `${ENDPOINT_ITEM}?Id=${itemId}&User_id=${currentUser}`
    : `${ENDPOINT_ITEM}?Id=${itemId}`;

  const [response, error, loading] = useAxios({ method: "GET", url });
  const [item, setItem] = useState<LNFItem>();

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

  const handleBack = () => {
    if (fromPeek) return navigate(ROUTE_HOME);
    if (fromDashboard) return navigate(ROUTE_DASHBOARD_ITEMS);
    navigate(ROUTE_SEARCH);
  };

  useEffect(() => {
    const data = response?.data as APIItemGET | undefined;
    if (!data) return;
    setItem(processItemResponseFromAPI(data));
  }, [response]);

  // item CRUD
  const itemBelongsToUser = currentUser && item && currentUser === item?.userID;
  const loadingCRUD = useAppSelector(selectViewLoading);

  return (
    <div className="view-item__container">
      <div className="view-item__actions">
        {fromPeek && (
          <BackButtonText
            className="view-item__back"
            onClick={handleBack}
            message="Return to home"
          />
        )}
        {fromDashboard && (
          <BackButtonText
            className="view-item__back"
            onClick={handleBack}
            message="Return to dashboard"
          />
        )}
        {!fromPeek && !fromDashboard && (
          <BackButtonText
            className="view-item__back"
            onClick={handleBack}
            message="Return to search results"
          />
        )}

        {itemBelongsToUser && (
          <ItemCRUDOptions item={item} userID={currentUser} />
        )}
      </div>

      {item && !loadingCRUD && <LostAndFoundItem {...item} />}
      {(loading || loadingCRUD) && <Loading />}
      {error && (
        <div className="search__error">
          <PopupMessage status="error" message={error.message} />
        </div>
      )}
    </div>
  );
};

export default ViewItem;
