import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function Home(props) {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const processSearch = (event) => {
    event.preventDefault();
    console.log("props", history, props);
    history.push("/results", { search: search });
  };

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
