import React, { useState } from "react";

interface FormFieldProps {
  labelContent: string;
  onChange: (ev: React.FormEvent<HTMLInputElement>) => void;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const FormField: React.FC<FormFieldProps> = function (props: FormFieldProps) {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);

  return (
    <>
      <label
        className={`form-field__label ${
          isFocus ? "form-field__label--focus" : ""
        }`}
      >
        {props.labelContent}
      </label>
      <input
        className="form-field__input"
        onFocus={handleFocusChange}
        onBlur={handleFocusChange}
        onChange={props.onChange}
        disabled={props.disabled}
        ref={props.inputRef}
      />
    </>
  );
};

export default FormField;
