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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import processItemResponseFromAPI from "../../utils/processItemResponseFromAPI";
import LostAndFoundItem from "./LostAndFoundItem";

const ViewItem: React.FC = function () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get(QUERY_SEARCH_ITEM_ID);
  const url = `${ENDPOINT_ITEM}?Id=${itemId}`;
  const [response, error, loading] = useAxiosGet({ url });
  const [item, setItem] = useState<LNFItem>();

  const fromPeek = searchParams.get(QUERY_SEARCH_IS_PEEK) === "true";
  const fromDashboard = searchParams.get(QUERY_SEARCH_DASHBOARD) === "true";

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
      <div className="view-item__back" onClick={handleBack}>
        <ChevronLeftIcon fontSize="large" />
        {fromPeek && <span>Return to home</span>}
        {fromDashboard && <span>Return to dashboard</span>}
        {!fromPeek && !fromDashboard && <span>Return to search results</span>}
      </div>
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
