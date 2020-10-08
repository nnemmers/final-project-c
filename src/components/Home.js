import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function Home(props) {
  const [search, setSearch] = useState("");

  // A hook that allows us to redirect the user
  const history = useHistory();

  // Function that runs when user clicks search, redirects to search page
  const processSearch = (event) => {
    event.preventDefault();
    console.log("props", history, props);
    history.push("/results", { search: search });
  };

  // Function that runs when the user types something in -- records their search
  const recordSearch = (event) => {
    const currentSearch = event.target.value;
    setSearch(currentSearch);
  };

  return (
    <section className="home">
      <form className="home__form" onSubmit={processSearch}>
        <input
          onChange={recordSearch}
          className="home__input"
          type="text"
          name="search"
          placeholder="Enter a name"
          required
        />
        <button className="home__button" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

export default Home;
