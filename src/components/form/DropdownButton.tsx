import React from "react";
import { nanoid } from "nanoid";
import { DropdownOption } from "../../constants";

interface DropdownButtonProps {
  dropdownName: string;
  dropdownID: string;
  options: DropdownOption[];
  onChange: (ev: React.FormEvent) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = function (
  props: DropdownButtonProps
) {
  const { options, dropdownName, dropdownID, onChange } = props;
  return (
    <select
      name={dropdownName}
      id={dropdownID}
      className="dropdown"
      onChange={onChange}
    >
      {options.map((item) => {
        return (
          <option value={item.key} key={nanoid()}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};

export default DropdownButton;
