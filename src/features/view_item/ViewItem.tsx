import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ENDPOINT_ITEM,
  APIItemGET,
  ROUTE_SEARCH,
  LNFItem,
  ROUTE_HOME,
  ROUTE_DASHBOARD_ITEMS,
  ENDPOINT_LOOKOUT,
} from "../../constants";
import processItemResponseFromAPI from "../../utils/processItemResponseFromAPI";
import LostAndFoundItem from "./LostAndFoundItem";
import BackButtonText from "../../components/buttons/BackButtonText";
import { firebaseAuth } from "../../app/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectViewItemSlice,
  selectViewLoading,
  updateViewStore,
} from "./viewItemSlice";
import PopupMessage from "../../components/PopupMessage";
import Loading from "../../components/Loading";
import ItemCRUDOptions from "./ItemCRUDOptions";
import useAxios from "../../hooks/useAxios";
import PreviewItems from "../preview_items/PreviewItems";

const ViewItem: React.FC = function () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const viewItemSlice = useAppSelector(selectViewItemSlice);
  const fromDashboard = viewItemSlice.from === "dashboard";
  const fromPeek = viewItemSlice.from === "peek";
  const isSimilar = viewItemSlice.isSimilarItem;
  const currentUser = firebaseAuth.currentUser?.uid;

  useEffect(() => {
    if (!viewItemSlice.id) {
      navigate(ROUTE_HOME);
      return;
    }
  }, []);

  const params = new URLSearchParams(
    fromDashboard && !isSimilar
      ? {
          Id: viewItemSlice.id as string,
          User_id: currentUser as string,
        }
      : { Id: viewItemSlice.id as string }
  );

  const url = `${ENDPOINT_ITEM}?${params.toString()}`;

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

      {item && !loadingCRUD && (
        <>
          <LostAndFoundItem {...item} />
          {fromDashboard && !isSimilar && (
            <>
              <h4>View similar items</h4>
              <PreviewItems
                dashboard={true}
                url={`${ENDPOINT_LOOKOUT}?${params.toString()}`}
              />
            </>
          )}
        </>
      )}
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
