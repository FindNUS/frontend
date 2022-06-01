import React, { useState } from "react";
import FormInput from "./FormInput";

interface FormFieldProps {
  labelContent: string;
  onChange: (ev: React.FormEvent<HTMLInputElement>) => void;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = function (props: FormFieldProps) {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);
  const { inputRef } = props;
  const type = props.type ?? "text";
  const disabled = props.disabled ?? false;

  const inputProps = {
    type,
    disabled,
    onFocus: handleFocusChange,
    onBlur: handleFocusChange,
    ...(inputRef && { ref: inputRef }), // Add inputRef is exists
  };

  return (
    <div className="form-field">
      <label
        className={`form-field__label ${
          isFocus ? "form-field__label--focus" : ""
        }`}
      >
        {props.labelContent}
      </label>
      <FormInput {...inputProps} />
    </div>
  );
};

export default FormField;
