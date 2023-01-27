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
import { Container } from 'react-bootstrap';

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
    const token = await JoblyApi.loginUser(formData);
    setTokenToLocalStorage(token);
    setToken(token);
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

  //TODO: rework to get user from API rather than fetchUserDataFromAPI
  async function handleUpdate(formData) {
    JoblyApi.token = token;
    const newUserInfo = await JoblyApi.updateUser(formData, user.data.username);
    setUser(prevState => ({
      ...prevState,
      data: { ...prevState.data, ...newUserInfo }
    }));
    //debugger;
    // await fetchUserDataFromAPI();
  }


  if (user.isLoading) return <Loader />;


  return (
    <userContext.Provider value={{ user: user.data }}>
      <BrowserRouter>
        <Header handleLogout={handleLogout} />
        <Container className="my-3">
          <RouteList
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleUpdate={handleUpdate}
          />
        </Container>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;

