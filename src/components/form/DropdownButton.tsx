import React, { useState } from "react";
import { nanoid } from "nanoid";
import { DropdownOption } from "../../constants";
import PopupMessage from "../PopupMessage";

interface DropdownButtonProps {
  dropdownName: string;
  dropdownID: string;
  options: DropdownOption[];
  onChange: (ev: React.FormEvent) => void;
  selected: string;
  isInvalid?: { status: boolean; error: string };
}

const DropdownButton: React.FC<DropdownButtonProps> = function (
  props: DropdownButtonProps
) {
  const [isEdited, setIsEdited] = useState(false);
  const { options, dropdownName, dropdownID, isInvalid, selected } = props;

  const onChange = (ev: React.FormEvent) => {
    !isEdited && setIsEdited(true);
    props.onChange(ev);
  };
  return (
    <div className="dropdown-container" data-testid="dropdown-container">
      {isInvalid?.status && (
        <PopupMessage status="error" message={isInvalid.error} />
      )}
      <select
        name={dropdownName}
        id={dropdownID}
        className="dropdown"
        onChange={onChange}
        value={selected}
        data-testid="dropdown-select"
        data-edited={isEdited}
      >
        {options.map((item) => {
          return (
            <option
              value={item.key}
              key={nanoid()}
              data-testid="dropdown-option"
            >
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownButton;
