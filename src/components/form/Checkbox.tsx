import { nanoid } from "nanoid";
import React from "react";

interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = function (props: CheckboxProps) {
  const { className, checked = false, onChange, label } = props;
  const id = nanoid();

  return (
    <div className={`checkbox ${className}`} data-testid="checkbox">
      <input
        type="checkbox"
        className="checkbox--input"
        id={id}
        onChange={onChange}
        defaultChecked={checked}
      />
      <label htmlFor={id} className="checkbox--label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
