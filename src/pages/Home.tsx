import React from "react";
import SearchBar from "../features/search/SearchBar";
import Header from "../components/header/Header";
import SearchContainer from "../features/search/SearchContainer";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { SEARCH_BAR_PROMPT } from "../constants";

const Home: React.FC = function () {
  return (
    <div className="home background background--main">
      <Header isHomePage={true} />
      <section className="home__body">
        <h1 className="home__header">Lost something? Start here.</h1>
        <SearchBar prompt={SEARCH_BAR_PROMPT} />
      </section>
      <div className="home__message text-white-shadow">
        <KeyboardDoubleArrowDownIcon fontSize="large" />
        <span>Scroll down to view recent items</span>
        <KeyboardDoubleArrowDownIcon fontSize="large" />
      </div>
      <SearchContainer isPeek={true} />
    </div>
  );
};

export default Home;
