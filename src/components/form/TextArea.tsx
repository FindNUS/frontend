import React from "react";

export interface TextAreaProps {
  onChange: (ev: React.FormEvent<HTMLTextAreaElement>) => void;
  isFocus: boolean;
  onFocusChange: () => void;
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = function (props: TextAreaProps) {
  const { isFocus, onFocusChange, onChange, defaultValue } = props;
  return (
    <textarea
      className={`form-field__textarea ${
        isFocus ? "form-field__textarea--focus" : ""
      }
      `}
      onBlur={onFocusChange}
      onFocus={onFocusChange}
      onChange={onChange}
      defaultValue={defaultValue}
    ></textarea>
  );
};

export default TextArea;
