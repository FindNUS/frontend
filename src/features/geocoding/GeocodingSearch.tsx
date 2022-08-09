import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { nanoid } from "nanoid";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { MAPS_GEOCODING_KEY } from "../../constants";

interface GeocodingSearchProps {
  query?: string;
  showResults: boolean;
  setGeocode: (ev: React.FormEvent) => void;
}

const GeocodingSearch: React.FC<GeocodingSearchProps> = function (
  props: GeocodingSearchProps
) {
  const { showResults, query, setGeocode } = props;
  const [result, setResult] = useState<google.maps.GeocoderResult[]>();

  const loader = new Loader({
    apiKey: MAPS_GEOCODING_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const handleQueryUrlChange = (query: string) => {
    loader.load().then((google) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: query, region: "SG" },
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (status !== "OK") {
            setResult([]);
            return console.error(
              "Error encountered when performing geocoding."
            );
          }
          const locations = results as google.maps.GeocoderResult[];
          // remove results without plus code
          setResult(locations.filter((loc) => !!loc?.plus_code));
        }
      );
    });
  };

  // timeout to prevent API spamming
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (!query) return;
      handleQueryUrlChange(query);
    }, 1500);

    return () => clearTimeout(identifier);
  }, [query]);
  1;
  return (
    <ul
      className={`geocoding__list ${
        query && result && showResults ? "" : "hidden"
      }`}
    >
      {!result ||
        (result.length === 0 && (
          <div className="geocoding__item geocoding__item--disabled">
            <span className="geocoding__item--descriptor geocoding__item--no-results">
              No results found. Please refine your search.
            </span>
          </div>
        ))}

      {result &&
        result.length !== 0 &&
        showResults &&
        result.map((it) => {
          const address = it.formatted_address;
          const plusCode = it.plus_code?.global_code;
          return (
            <div
              className="geocoding__item"
              key={nanoid()}
              data-pluscode={plusCode}
              onClick={setGeocode}
            >
              <LocationOnRoundedIcon
                fontSize="large"
                className="geocoding__item--icon"
              />
              <span className="geocoding__item--descriptor">{address}</span>
            </div>
          );
        })}
    </ul>
  );
};

export default GeocodingSearch;
