import React, { useEffect, useState } from "react";
import { peopleCollection } from "../data/firebase";

// The Search takes the input of the user and qureies the directory to return matched people listsings

function usePeople(searchTerm) {
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
    console.log("hello?");
    const getPeople = async () => {
      try {
        console.log("getting people...1");
        setLoading(true);
        const snapshot = await peopleCollection.orderBy("firstName").get();
        console.log("snapshot", snapshot.docs);
        setPeople(snapshot.docs);
        setError("");
        setLoading(false);
      } catch (err) {
        console.log("getting people...2", err);
        setError("Error finding users");
        setLoading(false);
      }
    };
    getPeople();
  }, []);
  console.log(searchResults);

  return [searchResults, error, loading];
}

export default usePeople;
