import React from "react";
import "../app/App.scss";
import Logo from "../components/Logo";
import Button from "../components/buttons/Button";
import ButtonFound from "../components/buttons/ButtonFound";
import SearchBar from "../features/search/SearchBar";
import Header from "../components/header/Header";
import PopupMessage from "../components/PopupMessage";
import ItemCard from "../components/ItemCard";

function ComponentsView() {
  return (
    <div className="components">
      <h3>Logo</h3>
      <Logo />

      <h3>Buttons</h3>
      <div className="components__horizontal">
        <Button class="btn btn--primary" text="Primary" />
        <Button class="btn btn--secondary" text="Secondary" />
        <Button class="btn btn--tertiary" text="Tertiary" />
        <Button class="btn btn--search" text="Search" />
        <ButtonFound />
      </div>

      <h3>Search Bar</h3>
      <SearchBar prompt="Search for an item" />

      <h3>Header</h3>
      <Header isHomePage={false} />

      <h3>Popup Message</h3>
      <div className="components__horizontal">
        <PopupMessage status="success" message="Success" />
        <PopupMessage status="warning" message="Warning" />
        <PopupMessage status="error" message="Error" />
      </div>

      <h3>Item</h3>
      <ItemCard
        category="grades"
        id="1"
        date={new Date()}
        name="CAP5.0"
        location="MPSH2"
        imageUrl="https://singaporegossip.files.wordpress.com/2016/07/download.jpg"
      />

      <h3>Headings</h3>
      <h1>This is a h1</h1>
      <h2>This is a h2</h2>
      <h3>This is a h3</h3>
      <h4>This is a h4</h4>
      <h5>This is a h5</h5>
      <h6>This is a h6</h6>
      <h2 className="text-white-shadow">This is a white h2</h2>
    </div>
  );
}

export default ComponentsView;
