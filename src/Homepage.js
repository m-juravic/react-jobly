/**
 * Renders the homepage
 *
 */
import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "./userContext";

/** Renders homepage. */

function Homepage() {
  const { user } = useContext(userContext);

  return (
    <>
      <h1>Jobly!</h1>
      <p>All the jobs in one, convenient place.</p>
      {user && <h2>Welcome Back, {user.username}!</h2>}
      {!user && <>
        <Link to="/login">Login</Link> <br /><br />
        <Link to="/register">Sign up</Link>
      </>}
    </>
  );
}

export default Homepage;