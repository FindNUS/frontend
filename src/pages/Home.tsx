import React from "react";
import SearchBar from "../features/search/SearchBar";
import ButtonFound from "../components/buttons/ButtonFound";
import Header from "../components/header/Header";

const Home: React.FC = function () {
  return (
    <div className="home">
      <Header isHomePage={true} />
      <section className="body">
        <h1 className="home__header">Lost something? Start here.</h1>
        <SearchBar prompt="Search for an item" />
        <ButtonFound />
      </section>
    </div>
  );
};

export default Home;
