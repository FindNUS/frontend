import React from "react";
import "../App.scss";
import Logo from "../components/logo";
import Button from "../components/Button";

function componentsView() {
  return (
    <div>
      <Logo />
      <div>
        <h2>Buttons</h2>
        <Button class="btn btn__primary" text="Primary" />
        <Button class="btn btn__secondary" text="Secondary" />
        <Button class="btn btn__tertiary" text="Tertiary" />
      </div>
    </div>
  );
}

export default componentsView;
