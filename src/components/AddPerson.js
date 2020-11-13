import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AddPerson.css";
import { peopleCollection } from "../data/firebase";
import firebase from "firebase/app";
import "@firebase/firestore";

function AddPerson(props) {
  const [person, setPerson] = useState({
    desk: 0,
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (event) => {
    // Update our state with what the user typing in
    setPerson({ ...person, [event.target.name]: event.target.value });
  };

  const addPerson = async (event) => {
    event.preventDefault();
    // Add a default image to the person and a dateStart
    const returned = await peopleCollection.add({
      ...person,
      image: "head",
      startDate: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setSuccessMessage("User successfully added!");
    console.log(returned);
  };

  return (
    <form className="person__form" onSubmit={addPerson}>
      <h1 className="success_message">{successMessage}</h1>
      <h1 className="person__header">Add a Person</h1>
      <label className="person__label">Email</label>
      <input
        className="person__input"
        type="email"
        name="email"
        required
        onChange={onChange}
      />

      <label className="person__label">First Name</label>
      <input
        className="person__input"
        type="text"
        name="firstName"
        required
        minLength="2"
        onChange={onChange}
      />

      <label className="person__label">Last Name</label>
      <input
        className="person__input"
        type="text"
        name="lastName"
        required
        minLength="2"
        onChange={onChange}
      />

      <label className="person__label">Mobile #</label>
      <input
        className="person__input"
        type="tel"
        name="mobile"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
        required
        onChange={onChange}
      />

      <label className="person__label">Phone #</label>
      <input
        className="person__input"
        type="tel"
        name="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
        required
        onChange={onChange}
      />

      <label className="person__label">Desk #</label>
      <input
        className="person__input"
        type="number"
        name="desk"
        required
        onChange={onChange}
      />

      <button type="submit" className="person__add">
        Add
      </button>
    </form>
  );
}

export default AddPerson;
