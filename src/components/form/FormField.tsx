import React, { useState } from "react";
import FormInput from "./FormInput";
import TextArea from "./TextArea";

interface FormFieldProps {
  labelContent: string;
  onChange: (ev: React.FormEvent) => void;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = function (props: FormFieldProps) {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);
  const { inputRef, onChange } = props;
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

      {!isTextArea && <FormInput {...inputProps} />}
      {isTextArea && <TextArea {...textareaProps} />}
    </div>
  );
};

export default FormField;
