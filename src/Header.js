import { Navigate, NavLink } from "react-router-dom";
import "./Header.css";
import userContext from "./userContext";
import { useContext } from "react";

/** Renders the header and navigation */

function Header({handleLogout}) {
  const { username } = useContext(userContext);
  return (
    <header className="Header">
      <nav>
        <NavLink to="/">Jobly</NavLink>
        <div>
          {username && <>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/" onClick={handleLogout}>Log out, {username}.</NavLink>
          </>
          }
          {!username && <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;