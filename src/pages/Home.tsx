import React, { useEffect } from "react";
import SearchBar from "../features/search/SearchBar";
import Header from "../components/header/Header";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import PeekContainer from "../features/preview_items/PeekContainer";
import { ITEMS_LOADING_TOAST, SEARCH_BAR_PROMPT } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  selectHasShownLoadingDelayToast,
  setShownLoadingDelayToast,
} from "../features/preview_items/previewItemsSlice";

const Home: React.FC = function () {
  const dispatch = useAppDispatch();
  const hasShownLoadingDelayToast = useAppSelector(
    selectHasShownLoadingDelayToast
  );
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    if (hasShownLoadingDelayToast) return;
    toast(ITEMS_LOADING_TOAST, {
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(setShownLoadingDelayToast());
  }, []);

  return (
    <div className="home background background--main">
      <Header isHomePage={true} isLoggedIn={isLoggedIn} />
      <section className="home__body">
        <h1 className="home__header">Lost&nbsp;something? Start&nbsp;here.</h1>
        <SearchBar prompt={SEARCH_BAR_PROMPT} />
      </section>
      <div className="home__message text-white-shadow">
        <KeyboardDoubleArrowDownIcon fontSize="large" />
        <span>Scroll down to view recent items</span>
        <KeyboardDoubleArrowDownIcon fontSize="large" />
      </div>
      <PeekContainer />
      <ToastContainer />
    </div>
  );
};

export default Home;
