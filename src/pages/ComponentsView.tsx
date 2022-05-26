import React from "react";
import "../app/App.scss";
import Logo from "../components/logo";
import Button from "../components/buttons/Button";
import ButtonFound from "../components/buttons/ButtonFound";
import SearchBar from "../components/SearchBar";
import Header from "../components/header/Header";

function ComponentsView() {
  return (
    <div className="components">
      <div>
        <h2>Logo</h2>
        <Logo />
      </div>
      <div>
        <h2>Buttons</h2>
        <Button class="btn btn--primary" text="Primary" />
        <Button class="btn btn--secondary" text="Secondary" />
        <Button class="btn btn--tertiary" text="Tertiary" />
        <Button class="btn btn--search" text="Search" />
        <ButtonFound />
      </div>
      <div>
        <h2>Search Bar</h2>
        <SearchBar prompt="Search for an item" />
      </div>
      <div>
        <Header />
      </div>
    </div>
  );
}

export default ComponentsView;
