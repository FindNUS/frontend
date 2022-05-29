import React from "react";
import Logo from "../components/Logo";
import ButtonLink from "../components/buttons/ButtonLink";
import SearchBar from "../features/search/SearchBar";
import ButtonFound from "../components/buttons/ButtonFound";
import LogoutButton from "../features/auth/LogoutButton";
import { useAppSelector } from "../hooks";
import { selectAuthIsLoggedIn } from "../features/auth/authSlice";

const Home: React.FC = function () {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return (
    <div className="home">
      <header className="home__nav">
        <Logo />
        {!isLoggedIn && (
          <ButtonLink class="btn btn--tertiary" text="Log In" to="/login" />
        )}
        {isLoggedIn && <LogoutButton />}
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
