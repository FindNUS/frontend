import React from "react";
import SearchBar from "../features/search/SearchBar";
import Header from "../components/header/Header";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import PeekContainer from "../features/preview_items/PeekContainer";
import { SEARCH_BAR_PROMPT } from "../constants";
import { useAppSelector } from "../hooks";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";

const Home: React.FC = function () {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <div className="home background background--main">
      <Header isHomePage={true} isLoggedIn={isLoggedIn} />
      <section className="home__body">
        <h1 className="home__header">Lost something? Start here.</h1>
        <SearchBar prompt={SEARCH_BAR_PROMPT} />
      </section>
      <div className="home__message text-white-shadow">
        <KeyboardDoubleArrowDownIcon fontSize="large" />
        <span>Scroll down to view recent items</span>
        <KeyboardDoubleArrowDownIcon fontSize="large" />
      </div>
      <PeekContainer />
    </div>
  );
};

export default Home;
