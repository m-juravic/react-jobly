import { BrowserRouter, Navigate } from 'react-router-dom';
import userContext from "./userContext";
import './App.css';
import Header from './Header';
import RouteList from './RouteList';
import { useEffect, useState } from 'react';
import NotFound from './NotFound';
import Loader from './Loader';
import JoblyApi from './helpers/api';
import decode from "jwt-decode";

/** Renders application */

function App() {
  const [user, setUser] = useState({
    data: null,
    isLoading: true
  });
  const [token, setToken] = useState(getTokenFromLocalStorage);

  /** Set token to local storage */

  function setTokenToLocalStorage(token) {
    localStorage.setItem("token", token);
  }

  /** Get token from local storage */

  function getTokenFromLocalStorage() {
    return localStorage.getItem("token");
  }

  /** Remove token from local storage */

  function removeTokenFromLocalStorage() {
    localStorage.removeItem("token");
  }

  /** Fetches user information */

  async function fetchUserDataFromAPI() {
    const payload = decode(token);
    const { username } = payload;

    JoblyApi.token = token;
    const currentUser = await JoblyApi.getCurrentUser(username);
    setUser({
      data: currentUser,
      isLoading: false
    });
  }

  // Every time the token changes trigger our use effect

  useEffect(function fetchAndSetUserInfo() {
    async function fetchUser() {

      if (token) {
        fetchUserDataFromAPI();
      } else {
        setUser({
          data: null,
          isLoading: false
        });
      }
    }
    fetchUser();
  }, [token]);

  /** Handles logging in. */

  async function handleLogin(formData) {
    try {
      const token = await JoblyApi.loginUser(formData);
      setTokenToLocalStorage(token);
      setToken(token);
    } catch (err) {
      throw new Error("Failed to log the user in.");
    }
  }

  /** Handles logging out. */

  function handleLogout() {
    removeTokenFromLocalStorage();
    setToken(null);
  }

  /** Handles registration */

  async function handleRegister(formData) {
    const token = await JoblyApi.registerUser(formData);
    setTokenToLocalStorage(token);
    setToken(token);
  }

  /** Handles user profile update */

  async function handleUpdate(formData) {
    JoblyApi.token = token;
    await JoblyApi.updateUser(formData, user.data.username);
    await fetchUserDataFromAPI();
  }


  if (user.isLoading) return <Loader />;


  return (
    <userContext.Provider value={{ user: user.data }}>
      <div className="App">
        <BrowserRouter>
          <Header handleLogout={handleLogout} />
          <RouteList
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleUpdate={handleUpdate}
          />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;

