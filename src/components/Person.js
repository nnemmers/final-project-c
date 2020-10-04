import React from "react";
import { Link } from "react-router-dom";
import "./Person.css";

function Person(props) {
  return (
    <li class="person">
      <img class="person__image" src={`/assets/${props.person.lastName}.jpg`} />
      <p>
        {props.person.firstName} {props.person.lastName}
      </p>
      <Link to={`/profile/${props.person.id}`}>
        <button>&gt;</button>
      </Link>
    </li>
  );
}

export default Person;
