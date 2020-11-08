import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { peopleCollection } from "../data/firebase";
import Person from "./Person";
// The Search takes the input of the user and qureies the directory to return matched people listsings

function SearchResults() {
  const location = useLocation();
  const searchTerm = location.state.search.toLowerCase();
  const [people, setPeople] = useState([]);
  console.log("Search term: ", searchTerm);
  console.log("people: ", people);
  const searchResults = [];
  for (let i = 0; i < people.length; i++) {
    const personId = people[i].id;
    const person = people[i].data();
    person.id = personId;
    console.log("Person", person);
    const fullName = person.firstName + person.lastName;
    const lowercaseFullName = fullName.toLowerCase();
    console.log("lowercaseFullName", lowercaseFullName);
    // If the full name contains the search term, it will give us the index (which is always greater than -1)
    if (lowercaseFullName.indexOf(searchTerm) > -1) {
      searchResults.push(person);
    }
  }
  useEffect(() => {
    const getPeople = async () => {
      const snapshot = await peopleCollection.get();
      console.log("snapshot", snapshot.docs);
      setPeople(snapshot.docs);
    };
    getPeople();
  }, []);
  console.log(searchResults);

  if (searchResults.length === 0) {
    return (
      <div className="search">
        <h3 className="search__header">Results for: {searchTerm}</h3>
        <p>No results found </p>
      </div>
    );
  } else {
    return (
      <div className="search">
        <h3 className="search__header">Results for {searchTerm}</h3>
        <ul>
          {searchResults.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
