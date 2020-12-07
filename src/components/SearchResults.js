import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { peopleCollection } from "../data/firebase";
import Person from "./Person";
import LoadingSpinner from "./LoadingSpinner";
import usePeople from "../hooks/usePeople";
// The Search takes the input of the user and qureies the directory to return matched people listsings

function SearchResults() {
  const location = useLocation();
  const searchTerm = location.state.search.toLowerCase();
  const [searchResults, error, loading] = usePeople(searchTerm);

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
