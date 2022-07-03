import React from "react";
import { useAppSelector } from "../../../hooks";
import { selectNumber } from "../loginSlice";
import useFirebaseGetOTP, {
  useFirebaseGetOTPProps,
} from "../../../hooks/useFirebaseGetOTP";
import verifyPhoneNumber from "./verifyPhoneNumber";
import { AUTH_ERROR_INVALID_PHONE } from "../../../constants";

interface GetOTPButtonProps extends useFirebaseGetOTPProps {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const GetOTPButton: React.FC<GetOTPButtonProps> = function (
  props: GetOTPButtonProps
) {
  const inputNumber = useAppSelector(selectNumber);
  const getOTPFromFirebase = useFirebaseGetOTP({ ...props });
  const { setError } = props;
  /**
   * Request for OTP through firebase authentication.
   * @param ev The DOM event triggerred by a mouse click.
   */
  const handleGetOTP = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const phoneNumber = verifyPhoneNumber(inputNumber);
    if (!phoneNumber) return setError(AUTH_ERROR_INVALID_PHONE);
    setError(undefined);
    getOTPFromFirebase(phoneNumber);
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
