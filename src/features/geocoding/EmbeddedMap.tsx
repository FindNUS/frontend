import React from "react";
import { MAPS_EMBED_KEY } from "../../constants";

interface EmbeddedMapProps {
  className?: string;
  plusCode: string;
}

const EmbeddedMap: React.FC<EmbeddedMapProps> = function (
  props: EmbeddedMapProps
) {
  const { className, plusCode } = props;
  const params = new URLSearchParams({
    key: MAPS_EMBED_KEY,
    q: plusCode,
  }).toString();

  const url = `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
  return (
    <iframe
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
      src={url}
    />
  );
};

export default EmbeddedMap;
