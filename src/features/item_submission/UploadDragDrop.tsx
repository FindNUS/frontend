import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { DRAG_DROP_MESSAGE, IMGUR_IMAGE_FORMATS } from "../../constants";
import ImageIcon from "@mui/icons-material/Image";

interface UploadDragDropProps {
  className: string;
}

const UploadDragDrop: React.FC<UploadDragDropProps> = function (
  props: UploadDragDropProps
) {
  const [file, setFile] = useState<File>();
  const handleChange = (file: File) => {
    setFile(file);
  };
  
  console.log(file);

  return (
    <FileUploader
      handleChange={handleChange}
      name="item-submission"
      types={IMGUR_IMAGE_FORMATS}
      classes={`file-upload ${props.className}`}
    >
      <span className="file-upload__icon">
        <ImageIcon fontSize="inherit" />
      </span>
      {DRAG_DROP_MESSAGE}
    </FileUploader>
  );
};

export default UploadDragDrop;
