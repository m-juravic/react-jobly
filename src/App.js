import { BrowserRouter } from 'react-router-dom';
import userContext from "./userContext";
import './App.css';
import Header from './Header';
import RouteList from './RouteList';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    /**
     * TODO:
     *call getToken()
     *  - store the full token into variable
     *  - split token to get the payload
     * - put payload into atob
     * - destructure username
     *
     */

    const token = getToken();
    const payload = JSON.parse(atob(token.split(".")[1]));
    const { username } = payload;

    if (user.isLoading) {
      const resp = await axios.get(`${BASE_URL}/users/${username}`,
        {
          headers: {
            Authorization: token
          }
        });
      resp.data.user.isLoading = false;
      setUser(resp.data.user);
    }
  }

  console.log("user=", user);

  fetchUserDataFromAPI();

  useEffect(function fetchAndSetUserInfo() {
    async function fetchUser() {
      const token = getToken();
      if (token) {
        console.log("token is present, fetch user info");
      } else {
        // TODO: remove
        console.log("DEBUG: no user token found");
      }
    }
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={DEFAULT_USER_INFO}>
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
