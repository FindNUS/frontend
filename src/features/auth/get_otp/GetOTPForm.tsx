import React from "react";
import FormField from "../../../components/form/FormField";
import { useAppDispatch } from "../../../hooks";
import { useFirebaseGetOTPProps } from "../../../hooks/useFirebaseGetOTP";
import GetOTPButton from "./GetOTPButton";
import { onChangeNumber } from "../loginSlice";

const GetOTPForm: React.FC<useFirebaseGetOTPProps> = function (
  props: useFirebaseGetOTPProps
) {
  const dispatch = useAppDispatch();

  // Handle form input change
  /**
   * Update input phone number in the store.
   * Dispatches the onChangeNumber action.
   * @param ev The DOM event triggerred by an input element change
   */
  const handleInputNumberChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    dispatch(onChangeNumber(target.value));
  };

  return (
    <form className="login-form__phone">
      <div className="form-field">
        <FormField
          labelContent="Phone Number"
          onChange={handleInputNumberChange}
          disabled={false}
        />
      </div>
      <GetOTPButton {...props} />
    </form>
  );
};

export default GetOTPForm;
