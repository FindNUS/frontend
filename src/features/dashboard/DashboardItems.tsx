import React, { useEffect } from "react";
import { firebaseAuth } from "../../app/firebase";
import { ENDPOINT_PEEK } from "../../constants";
import { useAppDispatch } from "../../hooks";
import PreviewItems from "../preview_items/PreviewItems";
import {
  setViewIsSimilarItem,
  setViewItemFrom,
} from "../view_item/viewItemSlice";

const DashboardItems: React.FC = function () {
  const userId = firebaseAuth.currentUser?.uid; // user should already be logged in
  const url = `${ENDPOINT_PEEK}?User_id=${userId}`;
  const dispatch = useAppDispatch();

  // update store on render
  useEffect(() => {
    dispatch(setViewItemFrom("dashboard"));
    dispatch(setViewIsSimilarItem(false));
  }, []);

  return <PreviewItems url={url} dashboard={true} />;
};

export default DashboardItems;
