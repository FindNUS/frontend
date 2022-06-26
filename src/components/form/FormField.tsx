import React, { useState } from "react";
import PopupMessage from "../PopupMessage";
import FormInput from "./FormInput";
import TextArea from "./TextArea";

interface FormFieldProps {
  labelContent: string;
  onChange: (ev: React.FormEvent) => void;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  type?: string;
  isInvalid?: { status: boolean; error: string };
}

const FormField: React.FC<FormFieldProps> = function (props: FormFieldProps) {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);
  const { inputRef, onChange, isInvalid } = props;
  const type = props.type ?? "text";
  const disabled = props.disabled ?? false;
  const isTextArea = props.type === "textarea";

  const inputProps = {
    type,
    disabled,
    onChange,
    onFocus: handleFocusChange,
    onBlur: handleFocusChange,
    ...(inputRef && { ref: inputRef }), // Add inputRef is exists
  };

  const textareaProps = {
    onChange,
    isFocus,
    onFocusChange: handleFocusChange,
  };

  return (
    <div className="form-field-container">
      {isInvalid?.status && (
        <PopupMessage status="error" message={isInvalid.error} />
      )}
      <div className="form-field">
        <label
          className={`form-field__label ${
            isFocus ? "form-field__label--focus" : ""
          }`}
        >
          {props.labelContent}
        </label>

        {!isTextArea && <FormInput {...inputProps} />}
        {isTextArea && <TextArea {...textareaProps} />}
      </div>
    </div>
  );
};

export default FormField;
