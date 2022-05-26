import React from "react";
import "../app/App.scss";
import Logo from "../components/Logo";
import Button from "../components/buttons/Button";
import ButtonFound from "../components/buttons/ButtonFound";
import SearchBar from "../components/SearchBar";
import Header from "../components/header/Header";
import PopupMessage from "../components/PopupMessage";
import ItemCard from "../components/ItemCard";

function ComponentsView() {
  return (
    <div className="components">
      <h2>Logo</h2>
      <Logo />

      <h2>Buttons</h2>
      <div className="components__horizontal">
        <Button class="btn btn--primary" text="Primary" />
        <Button class="btn btn--secondary" text="Secondary" />
        <Button class="btn btn--tertiary" text="Tertiary" />
        <Button class="btn btn--search" text="Search" />
        <ButtonFound />
      </div>

      <h2>Search Bar</h2>
      <SearchBar prompt="Search for an item" />

      <h2>Header</h2>
      <Header />

      <h2>Popup Message</h2>
      <div className="components__horizontal">
        <PopupMessage status="success" message="Success" />
        <PopupMessage status="warning" message="Warning" />
        <PopupMessage status="error" message="Error" />
      </div>

      <h2>Item</h2>
      <ItemCard
        category="grades"
        id="1"
        date={new Date()}
        name="CAP5.0"
        location="MPSH2"
        imageUrl="https://singaporegossip.files.wordpress.com/2016/07/download.jpg"
      />
    </div>
  );
}

export default ComponentsView;
