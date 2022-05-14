import React from "react";
import Logo from "../components/logo";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import ButtonFound from "../components/ButtonFound";

const Home: React.FC = function () {
  return (
    <div className="home">
      <div className="home__nav">
        <Logo />
        <Button class="btn btn--tertiary" text="Log In" />
      </div>
      <div className="body">
        <h1 className="home__header">Lost something? Start here.</h1>
        <SearchBar prompt="Search for an item" />
        <ButtonFound />
      </div>
    </div>
  );
};

export default Home;
