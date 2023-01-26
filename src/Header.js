import { NavLink } from "react-router-dom";
import "./Header.css";

/** Renders the header and navigation */

function Header() {
  return (
    <header className="Header">
      <nav>
        <NavLink to="/">Jobly</NavLink>
        <div>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;