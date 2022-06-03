import React, { useEffect, useState } from "react";
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
  // set to true as workaround for initial onDraggingStateChange execution
  const [isHover, setIsHover] = useState(true);
  const [fileURL, setFileURL] = useState("");
  const handleChange = (file: File) => {
    setFile(file);
  };

  // Generate file URL to display uploaded image
  useEffect(() => {
    file && setFileURL(URL.createObjectURL(file));
  }, [file]);

  return (
    <FileUploader
      handleChange={handleChange}
      name="item-submission"
      types={IMGUR_IMAGE_FORMATS}
      classes={`file-upload ${props.className}`}
      hoverTitle="Drop image here"
      onDraggingStateChange={() => setIsHover((prev) => !prev)}
    >
      <div className="file-upload__contents">
        {fileURL && (
          <img
            src={fileURL}
            className="file-upload__image"
            alt="Uploaded image"
          />
        )}
        {!isHover && !file && (
          <span className="file-upload__icon">
            <ImageIcon fontSize="inherit" />
          </span>
        )}
        {!isHover && !file && DRAG_DROP_MESSAGE}
      </div>
    </FileUploader>
  );
};

export default UploadDragDrop;
