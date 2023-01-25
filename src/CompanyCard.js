import "./CompanyCard.css"

function CompanyCard({ handle, description, logo }) {
  return (
    <div className="CompanyCard">
      <h3>{handle}</h3>
    </div>
  );
}

export default CompanyCard;