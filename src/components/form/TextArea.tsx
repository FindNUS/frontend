import React from "react";

export interface TextAreaProps {
  onChange: (ev: React.FormEvent<HTMLTextAreaElement>) => void;
  isFocus: boolean;
  onFocusChange: () => void;
  value?: string;
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = function (props: TextAreaProps) {
  const { isFocus, onFocusChange, onChange, defaultValue, value } = props;
  return (
    <textarea
      className={`form-field__textarea ${
        isFocus ? "form-field__textarea--focus" : ""
      }
      `}
      onBlur={onFocusChange}
      onFocus={onFocusChange}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    ></textarea>
  );
};

export default TextArea;
