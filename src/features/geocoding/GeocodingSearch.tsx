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
          if (status !== "OK")
            return console.error(
              "Error encountered when performing geocoding."
            );
          setResult(results as google.maps.GeocoderResult[]);
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

  return (
    <ul
      className={`geocoding__list ${
        query && result && showResults ? "" : "hidden"
      }`}
    >
      {result &&
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
              <span className="geocoding__item--descriptor">
                &nbsp;{address}
              </span>
            </div>
          );
        })}
    </ul>
  );
};

export default GeocodingSearch;
