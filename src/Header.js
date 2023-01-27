import { Navigate, NavLink } from "react-router-dom";
import "./Header.css";
import userContext from "./userContext";
import { useContext } from "react";

/** Renders the header and navigation */

function Header({ handleLogout }) {
  const { user } = useContext(userContext);
  return (
    <header className="Header">
      <nav>
        <NavLink to="/">Jobly</NavLink>
        <div>
          {user && <>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/" onClick={handleLogout}>Log out, {user.username}.</NavLink>
          </>
          }
          {!user && <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign up</NavLink>
          </>
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;