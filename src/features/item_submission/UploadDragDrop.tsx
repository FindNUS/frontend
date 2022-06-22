import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { DRAG_DROP_MESSAGE, IMGUR_IMAGE_FORMATS } from "../../constants";
import ImageIcon from "@mui/icons-material/Image";
import useConvertFileToBase64 from "../../hooks/useConvertFileToBase64";
import { useAppDispatch } from "../../hooks";
import { setSubmitImageState } from "./submitItemSlice";

interface UploadDragDropProps {
  className: string;
  onImageUpload: (url: string) => void;
}

const UploadDragDrop: React.FC<UploadDragDropProps> = function (
  props: UploadDragDropProps
) {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File>();
  // set to true as workaround for initial onDraggingStateChange execution
  const [isHover, setIsHover] = useState(true);
  const [fileURL, setFileURL] = useState("");
  const handleChange = (file: File) => {
    setFile(file);
  };
  const { className, onImageUpload } = props;
  const [convertResult, convertLoading, convertError, convertCallback] =
    useConvertFileToBase64(file);

  // Generate file URL to display uploaded image
  useEffect(() => {
    if (!file) return;
    setFileURL(URL.createObjectURL(file));
    convertCallback(file);
  }, [file]);

  useEffect(() => {
    onImageUpload(fileURL);
  }, [fileURL]);

  // update image conversion state
  useEffect(() => {
    dispatch(
      setSubmitImageState({
        type: "RESULT",
        data: convertResult,
        isLoading: convertLoading,
      })
    );
  }, [convertResult]);

  useEffect(() => {
    dispatch(
      setSubmitImageState({
        type: "ERROR",
        data: convertError,
        isLoading: convertLoading,
      })
    );
  }, [convertError]);

  return (
    <FileUploader
      handleChange={handleChange}
      name="item-submission"
      types={IMGUR_IMAGE_FORMATS}
      classes={`file-upload ${className}`}
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
