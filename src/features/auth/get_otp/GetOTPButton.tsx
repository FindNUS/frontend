import React from "react";
import { useAppSelector } from "../../../hooks";
import { selectNumber } from "../loginSlice";
import useFirebaseGetOTP, {
  useFirebaseGetOTPProps,
} from "../../../hooks/useFirebaseGetOTP";

const GetOTPButton: React.FC<useFirebaseGetOTPProps> = function (
  props: useFirebaseGetOTPProps
) {
  const inputNumber = useAppSelector(selectNumber);
  const getOTPFromFirebase = useFirebaseGetOTP({ ...props });

  /**
   * Request for OTP through firebase authentication.
   * @param ev The DOM event triggerred by a mouse click.
   */
  const handleGetOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    getOTPFromFirebase(inputNumber);
  };

  return (
    <button
      className="btn btn--tertiary login-form__btn"
      onClick={handleGetOTP}
    >
      Get OTP
    </button>
  );
};

export default GetOTPButton;
