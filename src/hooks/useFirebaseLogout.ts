import { useAppDispatch } from "./reduxHooks";
import { setIsLoggedIn, setToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  setLastRequested,
  updateMessage,
  updateStatus,
} from "../features/auth/loginSlice";
import { firebaseAuth } from "../app/firebase";

const useFirebaseLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  firebaseAuth.onAuthStateChanged((user) => {
    if (user) return; // Logged in

    // Logged out
    // Update auth slice
    dispatch(setIsLoggedIn(false));
    dispatch(setToken(""));

    // Update login slice
    dispatch(updateStatus(undefined));
    dispatch(updateMessage(""));
    dispatch(setLastRequested(undefined));
  });

  // Logout then redirect user to home page
  return () => {
    firebaseAuth.signOut();
    navigate("/");
  };
};

export default useFirebaseLogout;
