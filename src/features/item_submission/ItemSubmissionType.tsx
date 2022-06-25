import React from "react";
import BigButton from "../../components/buttons/BigButton";

const ItemSubmissionType: React.FC = function () {
  return (
    <div className="submit-item__type">
      <BigButton colour="tertiary" text="Found item" />
      <BigButton colour="secondary" text="Lost item" />
    </div>
  );
};

export default ItemSubmissionType;
