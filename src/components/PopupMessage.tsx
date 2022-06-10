import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import { LoginStatus } from "../features/auth/LoginForm";

export interface PopupMessageProps {
  status: LoginStatus;
  message: string;
}

const PopupMessage: React.FC<PopupMessageProps> = function (
  props: PopupMessageProps
) {
  return (
    <div
      className={`popup-msg ${
        props.status ? `popup-msg--${props.status}` : ""
      }`}
      data-testid="popup-msg"
    >
      {props.status === "success" && (
        <DoneRoundedIcon fontSize="large" className="popup-msg__icon" />
      )}
      {props.status === "warning" && (
        <WarningAmberRoundedIcon fontSize="large" className="popup-msg__icon" />
      )}
      {props.status === "error" && (
        <ErrorOutlineRoundedIcon fontSize="large" className="popup-msg__icon" />
      )}
      {props.status === "loading" && (
        <HourglassBottomRoundedIcon
          fontSize="medium"
          className="popup-msg__icon"
        />
      )}
      <span className="popup-msg__message">{props.message}</span>
    </div>
  );
};

export default PopupMessage;
