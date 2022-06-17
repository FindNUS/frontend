import React from "react";
import { nanoid } from "nanoid";

interface DropdownButtonProps {
  dropdownName: string;
  dropdownID: string;
  options: string[];
}

const DropdownButton: React.FC<DropdownButtonProps> = function (
  props: DropdownButtonProps
) {
  const { options, dropdownName, dropdownID } = props;
  return (
    <select name={dropdownName} id={dropdownID} className="dropdown">
      {options.map((item) => {
        return (
          <option
            value={item.toLowerCase().split(" ").join("-")}
            key={nanoid()}
          >
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default DropdownButton;
