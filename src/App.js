import { BrowserRouter, Navigate } from 'react-router-dom';
import userContext from "./userContext";
import './App.css';
import Header from './Header';
import RouteList from './RouteList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NotFound from './NotFound';
import Loader from './Loader';
import JoblyApi from './helpers/api';

const DEFAULT_USER_INFO = {
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  isLoading: true
};

const BASE_URL = "http://localhost:3001";

/** Renders application */

function App() {
  const [user, setUser] = useState(DEFAULT_USER_INFO);
  const [fetchingErrors, setFetchingErrors] = useState(false)

  /** Set token to local storage */

  function setToken(token) {
    localStorage.setItem("token", token);
  }

  /** Get token from local storage */

  function getToken() {
    return localStorage.getItem("token");
  }

  /** Remove token from local storage */

  function removeToken() {
    localStorage.removeItem("token");
  }

  /** Fetches user information */

  async function fetchUserDataFromAPI() {

    // TODO: use jwt_decode() instead of atob

    const token = getToken();
    const payload = JSON.parse(atob(token.split(".")[1]));
    const { username } = payload;

    if (user.isLoading) {
      try {
        const resp = await axios.get(`${BASE_URL}/users/${username}`,
          {
            headers: {
              Authorization: token
            }
          });
        resp.data.user.isLoading = false;
        setUser(resp.data.user);
      } catch (err) {
        console.log(err);
        setFetchingErrors(true)
        // return;
        // // return <NotFound message="Problems fetching user..." />
        // return <h2>Problems fetching user...</h2>;
      }
    }
  }

  useEffect(function fetchAndSetUserInfo() {
    async function fetchUser() {
      const token = getToken();

      if (token) {
        console.log("token is present, fetch user info");
        fetchUserDataFromAPI();
      } else {
        console.log("DEBUG: no user token found");
      }
    }
    fetchUser();
  }, []);

  // TODO: Ask if we should check presence of token or user.username

  console.log("fetching errors=", fetchingErrors)


  async function handleLogin(formData) {
    try {
      const token = await JoblyApi.loginUser(formData);
      setToken(token);
      setUser(formData);
    } catch (err) {
      throw new Error("Failed to log the user in.");
    }
  }

  function handleLogout() {
    removeToken();
    Navigate("/");
  }

  console.log("user state=", user)

  // TODO: Why does NotFound not show up?
  // if(fetchingErrors) return <NotFound message="Problems fetching data..." />
  if(fetchingErrors) return <h2>Problems fetching....</h2>

  if (user.isLoading && getToken()) return <Loader />;


  return (
    <userContext.Provider value={user}>
      <div className="App">
        <BrowserRouter>
          <Header handleLogout={handleLogout} />
          <RouteList handleLogin={handleLogin} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;

