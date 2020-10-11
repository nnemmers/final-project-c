import React, { useState, useEffect } from "react";
import Person from "./Person";
// FavoritesList represents the listing of people who have been added to the user's favorites list

function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Grab the list of favorites from our browser storage to display
    const existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (existingFavorites !== null) {
      setFavorites(existingFavorites);
    }
  }, []);

  return (
    <div className="favorites">
      <h2> Your Favorites </h2>
      {favorites.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}

export default FavoritesList;
