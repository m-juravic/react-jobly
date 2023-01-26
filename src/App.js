import { BrowserRouter } from 'react-router-dom';
import userContext from "./userContext";
import './App.css';
import Header from './Header';
import RouteList from './RouteList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NotFound from './NotFound';
import Loader from './Loader';

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

  function setToken() {

  }

  function getToken() {
    return localStorage.getItem("token");
  }

  async function fetchUserDataFromAPI() {
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
        // return <NotFound message="Problems fetching user..." />
        return <h2>Problems fetching user...</h2>;
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
        // TODO: remove
        console.log("DEBUG: no user token found");
      }
    }
    fetchUser();
  }, []);

  // TODO: Ask if we should check presence of token or user.username

  if (user.isLoading && getToken()) return <Loader />;


  return (
    <userContext.Provider value={user}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <RouteList />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
