/**
 * Renders the homepage
 *
 */
import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "./userContext";

function Homepage() {
  const { username } = useContext(userContext);

  return (
    <>
      <h1>Jobly!</h1>
      <p>All the jobs in one, convenient place.</p>
      {username && <h2>Welcome Back, {username}!</h2>}
      {!username && <>
        <Link to="/login">Login</Link> <br /><br />
        <Link to="/register">Sign up</Link>
      </>}
    </>
  );
}

export default Homepage;