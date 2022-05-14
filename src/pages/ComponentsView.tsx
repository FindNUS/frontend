import React from "react";
import "../App.scss";
import Logo from "../components/logo";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";

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
      </div>
      <div>
        <h2>Search Bar</h2>
        <SearchBar prompt="Search for an item" />
      </div>
    </div>
  );
}

export default ComponentsView;
