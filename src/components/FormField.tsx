import React, { useState } from "react";

interface FormFieldProps {
  labelContent: string;
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
      />
    </>
  );
};

export default FormField;
