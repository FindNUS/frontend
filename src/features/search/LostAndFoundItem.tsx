import React from "react";
import NoImage from "../../components/NoImage";
import { LNFItem } from "../../constants";

interface LostAndFoundItemProps extends LNFItem {
  className?: string;
}

const LostAndFoundItem: React.FC<LostAndFoundItemProps> = function (
  props: LostAndFoundItemProps
) {
  const {
    id,
    className,
    name,
    date,
    location,
    category,
    contactMethod,
    contactDetails,
    additionalDetails,
    imageUrl,
  } = props;
  return (
    <div className={`lnf-item ${className}`}>
      {imageUrl && (
        <img src={imageUrl} className="lnf-item__image" alt={name} />
      )}
      {!imageUrl && <NoImage className="lnf-item__image" />}
      <div className="lnf-item__details-container">
        <h3 className="lnf-item__details--header">{name}</h3>
        <div className="lnf-item__details lnf-item__details--id">
          <span className="lnf-item__descriptor">Item ID:&nbsp;</span>
          {id}
        </div>
        <div className="lnf-item__details lnf-item__details--date">
          <span className="lnf-item__descriptor">Date:&nbsp;</span>
          {date}
        </div>
        <div className="lnf-item__details lnf-item__details--location">
          <span className="lnf-item__descriptor">Location:&nbsp;</span>
          {location}
        </div>
        <div className="lnf-item__details lnf-item__details--category">
          <span className="lnf-item__descriptor">Category:&nbsp;</span>
          {category}
        </div>
        {contactMethod && (
          <div className="lnf-item__details lnf-item__details--contact-method">
            <span className="lnf-item__descriptor">
              Contact&nbsp;Method:&nbsp;
            </span>
            {contactMethod}
          </div>
        )}
        {contactDetails && (
          <div className="lnf-item__details lnf-item__details--contact-details">
            <span className="lnf-item__descriptor">
              Contact&nbsp;Details:&nbsp;
            </span>
            {contactDetails}
          </div>
        )}
        {additionalDetails && (
          <div className="lnf-item__details lnf-item__details--additional-details">
            <span className="lnf-item__descriptor">
              Additional&nbsp;Details:&nbsp;
            </span>
            {additionalDetails}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostAndFoundItem;
