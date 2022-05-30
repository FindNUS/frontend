import React from "react";
import { useAppSelector } from "../../hooks";
import useFirebaseVerifyOTP, {
  useFirebaseVerifyOTPProps,
} from "../../hooks/useFirebaseVerifyOTP";
import { selectOTP } from "./loginSlice";

const VerifyOTPButton: React.FC<useFirebaseVerifyOTPProps> = function (
  props: useFirebaseVerifyOTPProps
) {
  const inputOTP = useAppSelector(selectOTP);
  const verifyOTP = useFirebaseVerifyOTP({ ...props });

  /**
   * Verifies OTP input by the user.
   * User must get OTP before they are allowed to verify OTP.
   *
   * @param ev The DOM event triggerred by a mouse click.
   * @returns
   * @todo Store returned user credentials.
   * @todo Handle caught errors.
   */
  const handleVerifyOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    verifyOTP(inputOTP);
  };

  return (
    <button
      type="submit"
      className="btn btn--secondary"
      onClick={handleVerifyOTP}
      disabled={!props.confirmationResult}
    >
      Verify OTP
    </button>
  );
};

export default VerifyOTPButton;
