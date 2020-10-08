import React from "react";
import { Link } from "react-router-dom";
// This is the header bar

function Header() {
  return (
    <header class="header">
      <Link to="/">
        <img class="header__image" src={`/assets/head.png`} />
        <h1>PEOPLE FINDER </h1>
      </Link>
      <Link to="/favorites">
        <button>Favorites</button>
      </Link>
    </header>
  );
}

export default Header;
