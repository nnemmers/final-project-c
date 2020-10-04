import React from "react";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import FavoritesList from "./components/FavoritesList";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// This app is responsible for routing and loading the appropriate page within the application

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/results">
          <SearchResults />
        </Route>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
        <Route exact path="/favorites">
          <FavoritesList />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
