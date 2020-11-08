import React from "react";
import { Link } from "react-router-dom";
import "./Person.css";

function Person(props) {
  console.log("Props", props);
  return (
    <li className="person">
      <Link className="person__link" to={`/profile/${props.person.id}`}>
        <img
          className="person__image"
          src={`/assets/${props.person.lastName}.jpg`}
          alt="Person's thumbnail"
        />
        <p>
          {props.person.firstName} {props.person.lastName}
        </p>
        <button className="person__button">&gt;</button>
      </Link>
    </li>
  );
}

export default Person;
