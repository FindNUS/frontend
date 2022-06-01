import React, { useRef } from "react";
import FormField from "../../../components/form/FormField";
import VerifyOTPButton from "./VerifyOTPButton";
import type { useFirebaseVerifyOTPProps } from "../../../hooks/useFirebaseVerifyOTP";
import { onChangeOTP } from "../loginSlice";
import { useAppDispatch } from "../../../hooks";

const VerifyOTPForm: React.FC<useFirebaseVerifyOTPProps> = function (
  props: useFirebaseVerifyOTPProps
) {
  const dispatch = useAppDispatch();
  const inputOTPRef = useRef<HTMLInputElement>(null);
  const { confirmationResult } = props;

  /**
   * Update input OTP in the store.
   * Dispatches the onChangeOTP action.
   * @param ev The DOM event triggerred by an input element change.
   */
  const handleInputOTPChange = (ev: React.FormEvent) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeOTP(target.value));
  };

  // Clear OTP field after user is verified
  if (!confirmationResult && inputOTPRef.current) {
    const { current: inputOTPEl } = inputOTPRef;
    inputOTPEl.value = "";
  }

  return (
    <form className="login-form__otp">
      <FormField
        labelContent="Enter OTP"
        onChange={handleInputOTPChange}
        disabled={!props.confirmationResult}
        inputRef={inputOTPRef}
      />
      <VerifyOTPButton {...props} />
    </form>
  );
};

export default VerifyOTPForm;
