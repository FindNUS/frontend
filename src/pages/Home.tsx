import React from "react";
import Logo from "../components/logo";
import ButtonLink from "../components/ButtonLink";
import SearchBar from "../components/SearchBar";
import ButtonFound from "../components/ButtonFound";

const Home: React.FC = function () {
  return (
    <div className="home">
      <header className="home__nav">
        <Logo />
        <ButtonLink class="btn btn--tertiary" text="Log In" to="/login" />
      </header>
      <section className="body">
        <h1 className="home__header">Lost something? Start here.</h1>
        <SearchBar prompt="Search for an item" />
        <ButtonFound />
      </section>
    </div>
  );
};

export default Home;
