import React from "react";
import { nanoid } from "nanoid";
import { DropdownOption } from "../../constants";

interface DropdownButtonProps {
  dropdownName: string;
  dropdownID: string;
  options: DropdownOption[];
  onChange: (ev: React.FormEvent) => void;
  selected: string;
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
      value={props.selected}
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
