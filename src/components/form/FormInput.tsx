import React from "react";

export interface FormInputProps {
  type: string;
  disabled: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (ev: React.FormEvent) => void;
  value?: string;
  defaultValue?: string;
  max?: string;
  min?: string;
}

const FormInput: React.FC<FormInputProps> = function (props: FormInputProps) {
  return <input className="form-field__input" {...props} />;
};

export default FormInput;
