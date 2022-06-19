import React from "react";
import Card from "./Card";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NoImage from "./NoImage";

interface ItemCardProps {
  category: string;
  date: Date;
  id: string;
  imageUrl: string;
  location: string;
  name: string;
}

const ItemCard: React.FC<ItemCardProps> = function (props: ItemCardProps) {
  const { imageUrl, name, location, date } = props;
  return (
    <Card className="item-card">
      {imageUrl && (
        <img src={imageUrl} className="item-card__image" alt={name} />
      )}
      {!imageUrl && <NoImage className="item-card__image" />}
      <div className="item-card__contents">
        <span className="item-card__name">{name}</span>
        <div className="item-card__location">
          <LocationOnRoundedIcon fontSize="large" />
          <span className="item-card__location-text">{location}</span>
        </div>
        <div className="item-card__date">
          <AccessTimeRoundedIcon fontSize="large" />
          <span className="item-card__date-text">
            {date.toLocaleDateString("en-SG")}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
