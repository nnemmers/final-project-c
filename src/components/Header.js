import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { auth } from "../data/firebase";
// This is the header bar

function Header({ setUser, user }) {
  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <header className="header">
      <Link className="header__link-left" to="/add">
        <button className="header__button">Add</button>
      </Link>
      <Link to="/">
        <img
          className="header__image"
          src={`/assets/head.png`}
          alt="People Finder Logo"
        />
        <h1 className="header__title">PEOPLE FINDER </h1>
      </Link>
      {user ? (
        <button className="header__logout header__button" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link className="header__login" to="/account">
          <button className="header__button">Login</button>
        </Link>
      )}
      <Link className="header__link" to="/favorites">
        <button className="header__button">Favorites</button>
      </Link>
    </header>
  );
}

export default Header;
