import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import People from "../data/people";

function Profile(props) {
  const params = useParams();
  const [foundPerson, setFoundPerson] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  console.log(params);
  const personId = parseInt(params.id);

  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    for (let i = 0; i < People.length; i++) {
      const person = People[i];
      if (person.id === personId) {
        setFoundPerson(person);
      }
    }
    if (existingFavorites !== null) {
      for (let i = 0; i < existingFavorites.length; i++) {
        const person = existingFavorites[i];
        console.log(person);
        if (person.id === personId) {
          setIsFavorited(true);
        }
      }
    }
  }, []);

  console.log("foundPerson", foundPerson, isFavorited);

  const saveToFavorites = () => {
    let existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (existingFavorites == null) {
      existingFavorites = [];
    }
    existingFavorites.push(foundPerson);
    localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    setIsFavorited(true);
  };

  const removeFromFavorites = () => {
    let existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    for (let i = 0; i < existingFavorites.length; i++) {
      const person = existingFavorites[i];
      if (personId === person.id) {
        existingFavorites.splice(i, 1);
      }
    }

    localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    setIsFavorited(false);
  };

  return (
    <div class="profile">
      {isFavorited ? (
        <button onClick={removeFromFavorites}>Remove</button>
      ) : (
        <button onClick={saveToFavorites}>Add</button>
      )}
      <img class="profile__image" src={`/assets/${foundPerson.lastName}.jpg`} />
      <p>
        {foundPerson.firstName} {foundPerson.lastName}
      </p>
      <label>Office Phone</label>
      <p>{foundPerson.phone}</p>
      <label>Mobile</label>
      <p>{foundPerson.mobile}</p>
      <label>Email</label>
      <p>{foundPerson.email}</p>
      <label>Desk</label>
      <p>{foundPerson.desk}</p>
    </div>
  );
}

export default Profile;
