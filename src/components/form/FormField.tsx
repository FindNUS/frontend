import React, { forwardRef, useEffect, useRef, useState } from "react";
import PopupMessage from "../PopupMessage";
import FormInput from "./FormInput";
import TextArea from "./TextArea";

interface FormFieldProps {
  labelContent: string;
  onChange: (ev: React.FormEvent) => void;
  disabled: boolean;
  type?: string;
  isInvalid?: { status: boolean; error: string };
  value?: string;
  defaultValue?: string;
  dateMax?: string;
  dateMin?: string;
}

// eslint-disable-next-line react/display-name
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function (
  props: FormFieldProps,
  ref
) {
  const [isFocus, setIsFocus] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);
  const { isInvalid, value, defaultValue, dateMax, dateMin } = props;
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
    ...(ref && { ref }), // Add ref if it exists
    value,
    defaultValue,
    max: dateMax,
    min: dateMin,
  };

  const textareaProps = {
    onChange,
    isFocus,
    onFocusChange: handleFocusChange,
    value,
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
});

export default FormField;
