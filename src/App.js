import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddPerson from "./components/AddPerson";
import FavoritesList from "./components/FavoritesList";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./data/firebase";
import Login from "./components/Login";
import { generateUserDocument } from "./helper";
function AuthenticatedRoute(props) {
  const { isAuthenticated, children, ...routeProps } = props;
  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to="/account" />}
    </Route>
  );
}

// This app is responsible for routing and loading the appropriate page within the application
// Header will always appear above every page
function App() {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    async function createUser() {
      try {
        if (!user) {
          return;
        } else {
          await generateUserDocument(user);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    createUser();
  }, [user]);

  return (
    <BrowserRouter>
      <Header setUser={setUser} user={user} />
      <Switch>
        <AuthenticatedRoute isAuthenticated={isAuthenticated} exact path="/">
          <Home user={user} />
        </AuthenticatedRoute>
        <Route exact path="/account">
          <Login user={user} />
        </Route>
        <AuthenticatedRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/results"
        >
          <SearchResults user={user} />
        </AuthenticatedRoute>
        <AuthenticatedRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/profile/:id"
        >
          <Profile user={user} />
        </AuthenticatedRoute>
        <AuthenticatedRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/favorites"
        >
          <FavoritesList user={user} />
        </AuthenticatedRoute>
        <AuthenticatedRoute isAuthenticated={isAuthenticated} exact path="/add">
          <AddPerson user={user} />
        </AuthenticatedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
