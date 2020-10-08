import React from "react";
import { useLocation } from "react-router-dom";
import people from "../data/people";
import Person from "./Person";
// The Search takes the input of the user and qureies the directory to return matched people listsings

function SearchResults() {
  const location = useLocation();
  const searchTerm = location.state.search.toLowerCase();
  console.log("Search term: ", searchTerm);
  console.log("people: ", people);
  const searchResults = [];
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const fullName = person.firstName + person.lastName;
    const lowercaseFullName = fullName.toLowerCase();
    console.log("lowercaseFullName", lowercaseFullName);
    // If the full name contains the search term, it will give us the index (which is always greater than -1)
    if (lowercaseFullName.indexOf(searchTerm) > -1) {
      searchResults.push(person);
    }
  }

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
