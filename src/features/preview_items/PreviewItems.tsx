import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  APIItemGET,
  DROPDOWN_DEFAULT_KEY,
  ENDPOINT_PEEK,
  ENDPOINT_SEARCH,
  IMGUR_THUMBNAIL_MEDUIM,
  QUERY_SEARCH_DASHBOARD,
  QUERY_SEARCH_IS_PEEK,
  QUERY_SEARCH_ITEM_ID,
  QUERY_VIEW_ITEM_CATEGORY,
  QUERY_VIEW_ITEM_PER_PAGE,
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
import useAxios from "../../hooks/useAxios";
import PreviewPagination from "./PreviewPagination";
import {
  resetPreview,
  selectPreviewLastPage,
  selectPreviewPageNumber,
  setPreviewLastPage,
  setPreviewPageNumber,
} from "./previewItemsSlice";

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
  const [searchParams] = useSearchParams();
  const filterCategory = searchParams.get(QUERY_VIEW_ITEM_CATEGORY);
  const itemsPerPage = searchParams.get(QUERY_VIEW_ITEM_PER_PAGE);
  const isValidFilter =
    filterCategory && filterCategory !== DROPDOWN_DEFAULT_KEY;
  const isPeek = props.isPeek ?? false;
  const pageNumber = useAppSelector(selectPreviewPageNumber);
  const isLastPage = useAppSelector(selectPreviewLastPage);
  const dashboard = !!props.dashboard;

  const currentUrlParams = new URLSearchParams(
    isPeek
      ? {
          ...(itemsPerPage && { limit: itemsPerPage }),
          ...(isValidFilter && { category: filterCategory }),
          ...(pageNumber > 1 && {
            offset: `${(pageNumber - 1) * +(itemsPerPage as string)}`,
          }),
        }
      : { query: query }
  );

  const currentUrl =
    props.url ||
    `${
      isPeek ? ENDPOINT_PEEK : ENDPOINT_SEARCH
    }?${currentUrlParams.toString()}`;

  const [currentResponse, currentError, currentIsLoading] = useAxios({
    method: "GET",
    url: currentUrl,
  });

  useEffect(() => {
    if (currentIsLoading) {
      dispatch(setSearchLoading(true));
      return;
    }

    if (currentResponse === undefined) {
      dispatch(setQueryResults([]));
      return;
    }
    const items = parsePreviewItems(currentResponse.data);

    if (!isPeek && isValidFilter)
      // manual item filtering by category for search results
      dispatch(
        setQueryResults(
          items.filter((item) => item.category === filterCategory)
        )
      );
    else dispatch(setQueryResults(items));

    dispatch(setSearchLoading(false));
  }, [currentIsLoading, currentResponse, filterCategory]);

  const handleItemClick = (ev: React.MouseEvent) => {
    const item = ev.currentTarget;
    const id = item.getAttribute("data-id");

    const params = new URLSearchParams({
      ...(id && { [QUERY_SEARCH_ITEM_ID]: id }),
      [QUERY_SEARCH_IS_PEEK]: String(isPeek),
      [QUERY_SEARCH_DASHBOARD]: String(dashboard),
    });

    navigate(`${ROUTE_VIEW_ITEM}?${params.toString()}`);
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
    ...(itemsPerPage && { limit: itemsPerPage }),
    ...(isValidFilter && { category: filterCategory }),
    offset: `${pageNumber * +(itemsPerPage as string)}`,
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
    dispatch(resetPreview());
  }, [itemsPerPage]);

  return (
    <section className="search-results-container">
      <div className="search-results">
        {currentIsLoading && <Loading />}
        {!currentIsLoading && !currentError && queryResults.length === 0 && (
          <h4>
            No items found. {dashboard && "Submit a lost item to see it here."}
          </h4>
        )}
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
      </div>
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
