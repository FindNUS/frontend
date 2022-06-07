import React from "react";
import Button from "../../components/buttons/Button";
import FormField from "../../components/form/FormField";
import UploadDragDrop from "./UploadDragDrop";

const ItemSubmissionForm: React.FC = function () {
  return (
    <form className="submit-item__form">
      <div className="submit-item__form--fields">
        <FormField
          onChange={() => []}
          labelContent="Item Description"
          disabled={false}
        />
        {/* TODO: Add dropdown for item category */}
        <FormField
          onChange={() => []}
          labelContent="Location"
          disabled={false}
        />
        <FormField
          onChange={() => []}
          labelContent="Date"
          type="date"
          disabled={false}
        />
        <FormField
          onChange={() => []}
          labelContent="Contact details (optional)"
          disabled={false}
        />
        <FormField
          onChange={() => []}
          labelContent="Additional details"
          type="textarea"
          disabled={false}
        />
        <Button class="btn btn--primary" text="Submit" />
      </div>
      <UploadDragDrop className="submit-item__form--upload" />
    </form>
  );
};

export default ItemSubmissionForm;
