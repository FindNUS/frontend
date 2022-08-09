import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  APIItemGET,
  DROPDOWN_DEFAULT_KEY,
  ENDPOINT_PEEK,
  ENDPOINT_SEARCH,
  IMGUR_THUMBNAIL_MEDUIM,
  ROUTE_VIEW_ITEM,
} from "../../constants";
import {
  selectQuery,
  selectQueryResults,
  setQueryResults,
  setSearchLoading,
} from "../search/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import getImgurThumbnailUrl from "./getImgurThumbnailUrl";
import useAxios from "../../hooks/useAxios";
import PreviewPagination from "./PreviewPagination";
import {
  resetPreviewPagination,
  selectPreviewDate,
  selectPreviewSlice,
  setPreviewLastPage,
  setPreviewLoading,
  setPreviewPageNumber,
} from "./previewItemsSlice";
import {
  setViewIsSimilarItem,
  setViewItemFrom,
  setViewItemId,
} from "../view_item/viewItemSlice";

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
 * @param currentResponse The raw JSON data from API GET
 * @returns Object with camelCase keys
 */
const parsePreviewItems = (currentResponse: rawPreviewItemsType) => {
  return currentResponse.map((item) => {
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
  const isPeek = props.isPeek ?? false;
  const dashboard = !!props.dashboard;

  // update store on render
  useEffect(() => {
    dispatch(
      setViewItemFrom(isPeek ? "peek" : dashboard ? "dashboard" : "search")
    );
  }, []);
  const previewSlice = useAppSelector(selectPreviewSlice);
  const {
    itemsPerPage,
    category: filterCategory,
    pageNumber,
    offset,
    isLastPage,
  } = previewSlice;

  const dateFilter = useAppSelector(selectPreviewDate);
  const currentUrlParams = new URLSearchParams(
    isPeek
      ? // peek
        {
          limit: `${itemsPerPage}`,
          ...(filterCategory !== DROPDOWN_DEFAULT_KEY && {
            category: filterCategory,
          }),
          ...(pageNumber > 1 && { offset: `${offset}` }),
          startdate: new Date(dateFilter.start).toISOString(),
          enddate: new Date(dateFilter.end).toISOString(),
        }
      : // search
        { query: query }
  );

  const [currentUrl, setCurrentUrl] = useState<string>();
  useEffect(() => {
    setCurrentUrl(
      props.url ||
        `${
          isPeek ? ENDPOINT_PEEK : ENDPOINT_SEARCH
        }?${currentUrlParams.toString()}`
    );
  }, [previewSlice]);

  const [currentResponse, currentError, currentIsLoading] = useAxios({
    method: "GET",
    url: currentUrl,
  });

  useEffect(() => {
    if (currentIsLoading) {
      dispatch(setSearchLoading(true));
      dispatch(setPreviewLoading(true));
      return;
    }

    if (currentResponse === undefined) {
      dispatch(setQueryResults([]));
      dispatch(setPreviewLoading(false));
      return;
    }
    const items = parsePreviewItems(currentResponse.data);

    if (!isPeek && filterCategory !== DROPDOWN_DEFAULT_KEY)
      // manual item filtering by category for search results
      dispatch(
        setQueryResults(
          items.filter((item) => item.category === filterCategory)
        )
      );
    else dispatch(setQueryResults(items));

    dispatch(setSearchLoading(false));
    dispatch(setPreviewLoading(false));
  }, [currentIsLoading, currentResponse, filterCategory]);

  const location = useLocation();
  const handleItemClick = (ev: React.MouseEvent) => {
    const item = ev.currentTarget;
    const id = item.getAttribute("data-id");
    if (!id) return;
    // hide similar items if already clicked one
    if (location.pathname === ROUTE_VIEW_ITEM)
      dispatch(setViewIsSimilarItem(true));
    dispatch(setViewItemId(id));
    navigate(ROUTE_VIEW_ITEM);
  };

  const currentErrorMessage = currentError?.response as { data: string };

  // pagination
  const handlePageBack = () => {
    dispatch(setPreviewPageNumber(pageNumber - 1));
    if (isLastPage) dispatch(setPreviewLastPage(false));
  };
  const handlePageNext = () => {
    dispatch(setPreviewPageNumber(pageNumber + 1));
  };

  // Check if next page exists
  const nextUrlParams = new URLSearchParams({
    limit: `${itemsPerPage}`,
    ...(filterCategory !== DROPDOWN_DEFAULT_KEY && {
      category: filterCategory,
    }),
    startdate: new Date(dateFilter.start).toISOString(),
    enddate: new Date(dateFilter.end).toISOString(),
    offset: `${offset + itemsPerPage}`,
  });

  const nextUrl = `${ENDPOINT_PEEK}?${nextUrlParams.toString()}`;

  const [nextResponse, nextError, nextIsLoading] = useAxios({
    method: isPeek ? "GET" : undefined,
    url: nextUrl,
  });

  // check if next page has items
  useEffect(() => {
    if (nextIsLoading || !nextResponse) return;
    if (nextError) {
      dispatch(setPreviewLastPage(true));
    }
    const data = nextResponse.data as Array<APIItemGET>;
    if (data.length === 0) dispatch(setPreviewLastPage(true));
  }, [nextResponse, nextError, nextIsLoading]);

  // reset pagination on filter update
  useEffect(() => {
    dispatch(resetPreviewPagination());
  }, [itemsPerPage]);

  return (
    <section className="search-results">
      {currentIsLoading && <Loading />}
      {!currentIsLoading &&
        !currentError &&
        queryResults.length === 0 &&
        !dashboard && (
          <h4 className="search__error">
            No items found. {dashboard && "Submit a lost item to see it here."}
          </h4>
        )}
      {!currentIsLoading &&
        !currentError &&
        queryResults.length === 0 &&
        dashboard && <h4 className="search__error">No matching items.</h4>}
      {!currentIsLoading && !currentError && (
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
      {currentError && (
        <div className="search__error">
          <h2>Error</h2>
          <span>{JSON.stringify(currentErrorMessage.data)}</span>
        </div>
      )}
      {isPeek && !currentIsLoading && !currentError && (
        <PreviewPagination
          pageNumber={pageNumber}
          isLast={isLastPage}
          handleBack={handlePageBack}
          handleNext={handlePageNext}
        />
      )}
    </section>
  );
};

export default PreviewItems;
