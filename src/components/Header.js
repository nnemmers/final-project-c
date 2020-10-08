import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
// This is the header bar

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__image"
          src={`/assets/head.png`}
          alt="People Finder Logo"
        />
        <h1 className="header__title">PEOPLE FINDER </h1>
      </Link>
      <Link className="header__link" to="/favorites">
        <button className="header__button">Favorites</button>
      </Link>
    </header>
  );
}

export default Header;
