import React from "react";
import Header from "./header";
import SearchResults from "./search-results";
import Footer from "./footer";

// This app is responsible for routing and loading the appropriate page within the application

function App() {
  return (
    <div>
      <Header />
      <SearchResults />
      <Footer />
    </div>
  );
}

export default App;
