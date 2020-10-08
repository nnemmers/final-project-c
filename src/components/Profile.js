import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import People from "../data/people";

function Profile(props) {
  const params = useParams();
  const [foundPerson, setFoundPerson] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  const personId = parseInt(params.id);

  // Run the code in this block once we visit the favorites page
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
  }, [personId]);

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
    <div className="profile">
      <img
        className="profile__image"
        src={`/assets/${foundPerson.lastName}.jpg`}
        alt="Profile"
      />
      {isFavorited ? (
        <button className="profile__remove" onClick={removeFromFavorites}>
          Remove
        </button>
      ) : (
        <button className="profile__add" onClick={saveToFavorites}>
          Add
        </button>
      )}
      <p className="name">
        {foundPerson.firstName} {foundPerson.lastName}
      </p>
      <p>
        <label>Office Phone</label>
        <br></br>
        {foundPerson.phone}
      </p>
      <p>
        <label>Mobile</label>
        <br></br>
        {foundPerson.mobile}
      </p>
      <p>
        <label>Email</label>
        <br></br>
        <a href="{foundPerson.email}">{foundPerson.email}</a>
      </p>
      <p>
        <label>Desk</label>
        <br></br>
        {foundPerson.desk}
      </p>
    </div>
  );
}

export default Profile;
