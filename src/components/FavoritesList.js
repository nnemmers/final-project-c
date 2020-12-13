import React from "react";
import Person from "./Person";
import useFavorites from "../hooks/useFavorites";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
// FavoritesList represents the listing of people who have been added to the user's favorites list
function FavoritesList(props) {
  const [favorites, error, loading, setSort] = useFavorites(props.user);
  if (error) {
    return <ErrorMessage>Error loading favorites</ErrorMessage>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="favorites">
      <h2> Your Favorites </h2>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="firstName" defaultValue>
          Sort By First Name
        </option>
        <option value="lastName">Sort By Last Name</option>
      </select>
      {favorites.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}

export default FavoritesList;
