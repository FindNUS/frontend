import React, { forwardRef } from "react";

export interface FormInputProps {
  type: string;
  disabled: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (ev: React.FormEvent) => void;
  value?: string;
  defaultValue?: string;
  max?: string;
  min?: string;
}

// eslint-disable-next-line react/display-name
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function (
  props: FormInputProps,
  ref
) {
  const {
    type,
    disabled,
    onFocus,
    onBlur,
    onChange,
    value,
    defaultValue,
    max,
    min,
  } = props;
  return (
    <input
      ref={ref}
      className="form-field__input"
      type={type}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      max={max}
      min={min}
    />
  );
});

export default FormInput;
