import React from "react";
import { useAppSelector } from "../../hooks";
import { selectNumber } from "./loginSlice";
import { confirmationResultType } from "./LoginForm";
import useFirebaseGetOTP, {
  setAppVerifierType,
} from "../../hooks/useFirebaseGetOTP";

interface GetOTPButtonProps {
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<confirmationResultType>
  >;
  setAppVerifier: setAppVerifierType;
  recaptchaRef: React.RefObject<HTMLDivElement>;
}

const GetOTPButton: React.FC<GetOTPButtonProps> = function (
  props: GetOTPButtonProps
) {
  const { setConfirmationResult, setAppVerifier, recaptchaRef } = props;
  const inputNumber = useAppSelector(selectNumber);

  const getOTPFromFirebase = useFirebaseGetOTP({
    setConfirmationResult,
    setAppVerifier,
    recaptchaRef,
  });

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
