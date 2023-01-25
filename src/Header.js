import { Link } from "react-router-dom";
import "./Header.css";

//use NavLink rather than Link
function Header() {
  return (
    <header className="Header">
      <nav>
        <Link to="/">Jobly</Link>
        <div>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;