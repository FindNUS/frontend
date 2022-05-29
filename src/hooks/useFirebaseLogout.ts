import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./reduxHooks";
import { setIsLoggedIn, setToken } from "../features/auth/authSlice";

const useFirebaseLogout = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const firebaseAuthState = useAppSelector((state) => state.firebase.auth);

  const { isEmpty: authIsEmpty } = firebaseAuthState;

  useEffect(() => {
    // Check if user is logged out
    if (!authIsEmpty) return;

    // Update auth slice
    dispatch(setIsLoggedIn(false));
    dispatch(setToken(""));
  }, [authIsEmpty]);

  // Firebase sign out method
  return auth.signOut.bind(auth);
};

export default useFirebaseLogout;
