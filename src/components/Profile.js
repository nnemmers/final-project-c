import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { peopleCollection, usersCollection } from "../data/firebase";
import { getUserDocument } from "../helper";
import db from "../data/firebase";
function Profile(props) {
  const userRef = db.doc(`users/${props.user.uid}`);
  console.log("file: Profile.js ~ line 9 ~ Profile ~ userRef", userRef);

  console.log("is user in here", props.user.uid);
  const params = useParams();
  const [foundPerson, setFoundPerson] = useState({});
  const [existingFavoriteId, setExistingFavoriteId] = useState(null);
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

    const getExistingFavorites = async () => {
      const snapshot = await userRef.collection("favorites").get();
      console.log(snapshot.docs, snapshot);
      for (let i = 0; i < snapshot.docs.length; i++) {
        const favoriteId = snapshot.docs[i].id;
        const data = snapshot.docs[i].data();
        if (data.id === personId) {
          setIsFavorited(true);
          setExistingFavoriteId(favoriteId);
        }
      }
    };

    getExistingFavorites();
  }, [personId]);

  // Function that gets executed when the user presses add
  const saveToFavorites = async () => {
    // Store that favorite in the user's favorites collection
    const docRef = await userRef.collection("favorites").add(foundPerson);
    console.log(
      "file: Profile.js ~ line 58 ~ saveToFavorites ~ docRef",
      docRef.id
    );
    setIsFavorited(true);
    setExistingFavoriteId(docRef.id);
  };

  const removeFromFavorites = () => {
    // Remove the person from the user's favorite collection
    //by getting a ref to it and then deleting it
    const favoriteRef = db.doc(
      `/users/${props.user.uid}/favorites/${existingFavoriteId}`
    );
    favoriteRef.delete();
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
