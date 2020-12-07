import React, { useState, useEffect } from "react";
import Person from "./Person";
import { usersCollection } from "../data/firebase";
import db from "../data/firebase";
// FavoritesList represents the listing of people who have been added to the user's favorites list

function FavoritesList(props) {
  const [favorites, setFavorites] = useState([]);
  const userRef = db.doc(`users/${props.user.uid}`);
  useEffect(() => {
    // Grab the list of favorites from our browser storage to display
    const getFavorites = async () => {
      try {
        const snapshot = await userRef.collection("favorites").get();
        console.log(snapshot.docs);
        let temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          const person = snapshot.docs[i].data();
          temp.push(person);
        }
        console.log("any people in this arr", temp);
        if (temp.length > 0) {
          setFavorites(temp);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getFavorites();
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
