import React, { useState, useEffect } from "react";
import Person from "./Person";
// FavorirstList represents the listing of people who have been added to the user's favorites list

function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (existingFavorites !== null) {
      setFavorites(existingFavorites);
    }
  }, []);

  return (
    <div>
      <h2> Your Favorites </h2>
      {favorites.map((person) => (
        <Person person={person} />
      ))}
    </div>
  );
}

export default FavoritesList;
