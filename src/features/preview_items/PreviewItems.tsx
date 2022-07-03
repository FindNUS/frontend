import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import useAxiosGet from "../../hooks/useAxiosGet";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  DROPDOWN_DEFAULT_KEY,
  ENDPOINT_PEEK,
  ENDPOINT_SEARCH,
  IMGUR_THUMBNAIL_MEDUIM,
  PEEK_DEFAULT_LIMIT,
  QUERY_SEARCH_DASHBOARD,
  QUERY_SEARCH_IS_PEEK,
  QUERY_SEARCH_ITEM_ID,
  QUERY_VIEW_ITEM_CATEGORY,
  ROUTE_VIEW_ITEM,
} from "../../constants";
import {
  selectQuery,
  selectQueryResults,
  setQueryResults,
  setSearchLoading,
} from "../search/searchSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import getImgurThumbnailUrl from "./getImgurThumbnailUrl";

type rawPreviewItemsType = {
  Name: string;
  Id: string;
  Date: string;
  Location: string;
  Category: string;
  Image_url: string;
}[];

export type PreviewItemsType = ReturnType<typeof parsePreviewItems>;

interface previewItemType {
  name: string;
  id: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
}

/**
 * Parses the raw string data and converts it into an object
 * @param response The raw JSON data from API GET
 * @returns Object with camelCase keys
 */
const parsePreviewItems = (response: rawPreviewItemsType) => {
  return response.map((item) => {
    const {
      Name: name,
      Id: id,
      Date: date,
      Location: location,
      Category: category,
      Image_url: imageUrl,
    } = item;

    return {
      name,
      id,
      date,
      location,
      category,
      imageUrl,
    };
  });
};

interface PreviewItemsProps {
  isPeek?: boolean;
  dashboard?: boolean;
  url?: string;
}

const PreviewItems: React.FC<PreviewItemsProps> = function (
  props: PreviewItemsProps
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector(selectQuery);
  const queryResults = useAppSelector(selectQueryResults);
  const [searchParams] = useSearchParams();
  const filterCategory = searchParams.get(QUERY_VIEW_ITEM_CATEGORY);
  const isValidFilter =
    filterCategory && filterCategory !== DROPDOWN_DEFAULT_KEY;
  const isPeek = props.isPeek ?? false;
  const dashboard = !!props.dashboard;
  const url =
    props.url ||
    (isPeek
      ? `${ENDPOINT_PEEK}?limit=${PEEK_DEFAULT_LIMIT}${
          isValidFilter ? `&category=${filterCategory}` : ""
        }`
      : `${ENDPOINT_SEARCH}?query=${query}`);

  const [response, error, isLoading] = useAxiosGet({ url });

  useEffect(() => {
    if (isLoading) {
      dispatch(setSearchLoading(true));
      return;
    }

    if (response === undefined) {
      dispatch(setQueryResults([]));
      return;
    }
    const items = parsePreviewItems(response.data);

    if (!isPeek && isValidFilter)
      // manual item filtering by category for search results
      dispatch(
        setQueryResults(
          items.filter((item) => item.category === filterCategory)
        )
      );
    else dispatch(setQueryResults(items));

    dispatch(setSearchLoading(false));
  }, [isLoading, response, filterCategory]);

  const handleItemClick = (ev: React.MouseEvent) => {
    const item = ev.currentTarget;
    const id = item.getAttribute("data-id");
    navigate(
      `${ROUTE_VIEW_ITEM}?${QUERY_SEARCH_ITEM_ID}=${id}&${QUERY_SEARCH_IS_PEEK}=${isPeek}&${QUERY_SEARCH_DASHBOARD}=${dashboard}`
    );
  };

  const errorMessage = error?.response as { data: string };

  return (
    <section className="search-results-container">
      <div className="search-results">
        {isLoading && <Loading />}
        {!isLoading && !error && queryResults.length === 0 && (
          <h4>
            No items found. {dashboard && "Submit a lost item to see it here."}
          </h4>
        )}
        {!isLoading && !error && (
          <ul className="search-results__list">
            {queryResults.map((item: previewItemType) => {
              const { name, id, date, location, category } = item;
              // set image to load thumbnail
              const imageUrl: string | undefined = item.imageUrl
                ? getImgurThumbnailUrl(item.imageUrl, IMGUR_THUMBNAIL_MEDUIM)
                : "";
              return (
                <li
                  className="search-results__item"
                  key={id}
                  onClick={handleItemClick}
                  data-id={id}
                >
                  <ItemCard
                    name={name}
                    id={id}
                    date={new Date(date)}
                    location={location}
                    category={category}
                    imageUrl={imageUrl}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {error && (
          <div className="search__error">
            <h2>Error</h2>
            <span>{JSON.stringify(errorMessage.data)}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewItems;
