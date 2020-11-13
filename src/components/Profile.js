import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { peopleCollection } from "../data/firebase";

function Profile(props) {
  const params = useParams();
  const [foundPerson, setFoundPerson] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  const personId = params.id; // Grab the ID of the person from the URL

  // Run the code in this block once we visit the favorites page
  useEffect(() => {
    const getPersonById = async () => {
      const snapshot = await peopleCollection.doc(personId).get();
      console.log(
        "snapshot",
        snapshot.data().startDate.toDate().toLocaleDateString("en-US")
      );
      console.log(snapshot.id);
      setFoundPerson({ id: snapshot.id, ...snapshot.data() });
    };
    getPersonById();
    const existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    // Check to see if the user is already favorited
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

  // Function that gets executed when the user presses add
  const saveToFavorites = () => {
    // Grab any existing favorites from our browser storage
    let existingFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (existingFavorites == null) {
      existingFavorites = [];
    }
    // Overwrite the browser storage with the new favorited person
    existingFavorites.push(foundPerson);
    localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    setIsFavorited(true);
  };

  const removeFromFavorites = () => {
    // Remove the person from the favorites list stored in our browser
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
        src={`/assets/${foundPerson.image}.jpg`}
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
      <p>
        <label>Start Date</label>
        <br></br>
        {Object.keys(foundPerson).length > 0
          ? foundPerson.startDate.toDate().toLocaleDateString("en-US")
          : null}
      </p>
    </div>
  );
}

export default Profile;
