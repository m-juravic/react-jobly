import "./CompanyCard.css"
import { Link } from "react-router-dom"

/**
 * Renders a company card
 *
 * Props:
 * - handle, description, logo
 */
function CompanyCard({ handle, description, logo }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`}>{handle}</Link>
      <p>{description}</p>
      {logo && <img src={logo} alt={handle}/>}
    </div>
  );
}

export default CompanyCard;