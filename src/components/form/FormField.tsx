import React, { useEffect, useRef, useState } from "react";
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
  defaultValue?: string;
}

const FormField: React.FC<FormFieldProps> = function (props: FormFieldProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);
  const { inputRef, isInvalid, defaultValue } = props;
  const onChange = (ev: React.FormEvent) => {
    !isEdited && setIsEdited(true);
    props.onChange(ev);
  };

  const type = props.type ?? "text";
  const disabled = props.disabled ?? false;
  const isTextArea = props.type === "textarea";

  const formFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEdited) return;
    // updated edited attribute
    const container = formFieldRef.current as HTMLDivElement;
    container.setAttribute("data-edited", "true");
  }, [isEdited]);

  const inputProps = {
    type,
    disabled,
    onChange,
    onFocus: handleFocusChange,
    onBlur: handleFocusChange,
    ...(inputRef && { ref: inputRef }), // Add inputRef is exists
    defaultValue,
  };

  const textareaProps = {
    onChange,
    isFocus,
    onFocusChange: handleFocusChange,
    defaultValue,
  };

  return (
    <div
      className="form-field-container"
      ref={formFieldRef}
      data-testid="form-field-container"
      data-edited={isEdited}
    >
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
