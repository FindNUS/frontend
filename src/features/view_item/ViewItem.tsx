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
import useAxiosGet from "../../hooks/useAxiosGet";
import processItemResponseFromAPI from "../../utils/processItemResponseFromAPI";
import LostAndFoundItem from "./LostAndFoundItem";
import BackButtonText from "../../components/buttons/BackButtonText";
import { firebaseAuth } from "../../app/firebase";

const ViewItem: React.FC = function () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get(QUERY_SEARCH_ITEM_ID);
  const fromPeek = searchParams.get(QUERY_SEARCH_IS_PEEK) === "true";
  const fromDashboard = searchParams.get(QUERY_SEARCH_DASHBOARD) === "true";

  const url = fromDashboard
    ? `${ENDPOINT_ITEM}?Id=${itemId}&User_id=${firebaseAuth.currentUser?.uid}`
    : `${ENDPOINT_ITEM}?Id=${itemId}`;

  const [response, error, loading] = useAxiosGet({ url });
  const [item, setItem] = useState<LNFItem>();

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

  return (
    <div className="view-item__container">
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
      {item && <LostAndFoundItem {...item} />}
      {loading && <h3>Loading...</h3>}
      {error && (
        <div className="search__error">
          <h2>Error</h2>
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default ViewItem;
