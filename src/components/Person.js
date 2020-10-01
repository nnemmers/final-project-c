import React from "react";
import { Link } from "react-router-dom";

function Person(props) {
  return (
    <div class="person">
      <img class="person__image" src="#" />
      <p>
        {props.person.firstName} {props.person.lastName}
      </p>
      <Link>
        <button>&gt;</button>
      </Link>
    </div>
  );
}

export default Person;
