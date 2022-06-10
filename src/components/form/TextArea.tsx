import React, { useState } from "react";

export interface TextAreaProps {
  onChange: (ev: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = function (props: TextAreaProps) {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocusChange = () => setIsFocus((prevState) => !prevState);

  return (
    <textarea
      className={`form-field__textarea ${
        isFocus ? "form-field__textarea--focus" : ""
      }
      `}
      onBlur={handleFocusChange}
      onFocus={handleFocusChange}
      {...props}
    ></textarea>
  );
};

export default TextArea;
