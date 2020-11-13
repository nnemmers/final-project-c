import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { peopleCollection } from "../data/firebase";
import Person from "./Person";
import LoadingSpinner from "./LoadingSpinner";
// The Search takes the input of the user and qureies the directory to return matched people listsings

function SearchResults() {
  const location = useLocation();
  const searchTerm = location.state.search.toLowerCase();
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      try {
        setLoading(true);
        const snapshot = await peopleCollection.orderBy("firstName").get();
        console.log("snapshot", snapshot.docs);
        setPeople(snapshot.docs);
        setError("");
        setLoading(false);
      } catch (err) {
        setError("Error finding users");
        setLoading(false);
      }
    };
    getPeople();
  }, []);
  console.log(searchResults);

  if (loading === true) {
    return <LoadingSpinner />;
  }

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
        {error ? <h2 className="error__message">{error}</h2> : null}
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
