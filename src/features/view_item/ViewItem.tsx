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
import Checkbox from "../../components/form/Checkbox";

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

  const [responseGET, errorGET, loadingGET] = useAxios({ method: "GET", url });
  const [item, setItem] = useState<LNFItem>();
  const [patchURL, setPatchURL] = useState<string>();
  const [patchConfig, setPatchConfig] = useState<string>();
  const [responsePATCH, errorPATCH, loadingPATCH] = useAxios({
    method: "PATCH",
    url: patchURL,
    config: patchConfig,
  });

  // lookout
  const isLookoutItem = item && !!item.lookout;
  const handleLookoutChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!responseGET) return;
    const isChecked = ev.target.checked;
    const currentItem = responseGET.data as APIItemGET;
    const updatedItem = {
      Id: currentItem.Id,
      User_id: currentItem.User_id,
      Lookout: isChecked,
    };

    setPatchConfig(JSON.stringify(updatedItem));
    setItem((prev) => {
      if (!prev) return undefined;
      return { ...prev, lookout: isChecked };
    });
    setPatchURL(
      `${ENDPOINT_ITEM}?Id=${currentItem.Id}&User_id=${currentItem.User_id}`
    );
  };

  useEffect(() => {
    if (responsePATCH?.status === 200) setPatchURL(undefined);
  }, [responsePATCH]);

  // update viewItem store
  useEffect(() => {
    const errorStatusGET = errorGET ? "error" : undefined;
    const message = errorGET?.message;
    dispatch(
      updateViewStore({
        isLoading: loadingGET,
        status: errorStatusGET,
        message,
      })
    );
  }, [loadingGET, errorGET]);

  const handleBack = () => {
    if (fromPeek) return navigate(ROUTE_HOME);
    if (fromDashboard) return navigate(ROUTE_DASHBOARD_ITEMS);
    navigate(ROUTE_SEARCH);
  };

  useEffect(() => {
    const data = responseGET?.data as APIItemGET | undefined;
    if (!data) return;
    setItem(processItemResponseFromAPI(data));
  }, [responseGET]);

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
              {!loadingPATCH && !errorPATCH && (
                <Checkbox
                  label="Subscribe to lookout notifications"
                  onChange={handleLookoutChange}
                  checked={isLookoutItem}
                />
              )}
              <div className="tooltip">
                <h4>View&nbsp;Possible&nbsp;Matches</h4>
                <span className="tooltiptext">
                  This feature uses Natural Language Processing (NLP) to find
                  matching items in our database. The options that are relevant
                  to the item are ranked appropriately.
                </span>
              </div>
              <PreviewItems
                dashboard={true}
                url={`${ENDPOINT_LOOKOUT}?${params.toString()}`}
              />
            </>
          )}
        </>
      )}
      {(loadingGET || loadingCRUD) && <Loading />}
      <>
        {errorGET && (
          <div className="search__error">
            <PopupMessage status="error" message={errorGET.message} />
          </div>
        )}
        {errorPATCH && (
          <div className="search__error">
            <PopupMessage status="error" message={errorPATCH.message} />
          </div>
        )}
      </>
    </div>
  );
};

export default ViewItem;
