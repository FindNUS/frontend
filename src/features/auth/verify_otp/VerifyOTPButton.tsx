import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NEW_USER_THRESHOLD,
  ROUTE_DASHBOARD_HOME,
  ROUTE_LOGIN_FIRST_TIME,
} from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import useFirebaseVerifyOTP, {
  useFirebaseVerifyOTPProps,
} from "../../../hooks/useFirebaseVerifyOTP";
import {
  selectAuthIsFirstTime,
  setAuthIsFirstTime,
  setIsLoggedIn,
} from "../authSlice";
import { selectOTP } from "../loginSlice";

const VerifyOTPButton: React.FC<useFirebaseVerifyOTPProps> = function (
  props: useFirebaseVerifyOTPProps
) {
  const inputOTP = useAppSelector(selectOTP);
  const verifyOTP = useFirebaseVerifyOTP({ ...props });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  // runs when user is logged in
  const authState = useAppSelector((state) => state.firebase.auth);
  useEffect(() => {
    if (authState.isEmpty) return;

    dispatch(setIsLoggedIn(true));
    const { lastLoginAt, createdAt, displayName, email } = authState;
    const firstTime =
      +lastLoginAt - +createdAt < NEW_USER_THRESHOLD || !displayName || !email;
    if (firstTime) {
      // first time user (new account or no display name)
      dispatch(setAuthIsFirstTime(true));
      return;
    }

    navigate(ROUTE_DASHBOARD_HOME);
  }, [authState]);

  // redirect to first timer page to collect user information
  const isFirstTimeUser = useAppSelector(selectAuthIsFirstTime);
  useEffect(() => {
    if (!isFirstTimeUser) return;
    navigate(ROUTE_LOGIN_FIRST_TIME);
  }, [isFirstTimeUser]);

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
