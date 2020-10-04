import React from "react";
import { Link } from "react-router-dom";
// This is the header bar

function Header() {
  return (
    <header>
      <h1>PEOPLE FINDER </h1>
      <Link to="/favorites">
        <button>Favorites</button>
      </Link>
    </header>
  );
}

export default Header;
