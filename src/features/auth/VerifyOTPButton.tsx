import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOTP } from "./loginSlice";
import type { confirmationResultType } from "./LoginForm";

interface VerifyOTPButtonProps {
  confirmationResult: confirmationResultType;
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<confirmationResultType>
  >;
}

const VerifyOTPButton: React.FC<VerifyOTPButtonProps> = function (
  props: VerifyOTPButtonProps
) {
  const inputOTP = useAppSelector(selectOTP);

  /**
   * Verifies OTP input by the user
   *
   * User must get OTP before they are allowed to verify OTP
   *
   * @param ev The DOM event triggerred by a mouse click
   * @returns {void}
   * @todo Implement error handling with error message
   */
  const handleVerifyOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    try {
      ev.preventDefault();
      console.log("Verifying OTP");
      if (!props.confirmationResult)
        return console.log("Request for SMS first!");
      props.confirmationResult.confirm(inputOTP);
      // Clear confirmation upon verification
      props.setConfirmationResult(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="submit"
      className="btn btn--secondary"
      onClick={handleVerifyOTP}
    >
      Verify OTP
    </button>
  );
};

export default VerifyOTPButton;
