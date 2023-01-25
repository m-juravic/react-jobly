import "./JobCard.css";

function JobCard({ id, title, salary, company, equity }) {
  return (
    <div className="JobCard" id={id}>
      <h3>Title: {title}</h3>
      <h4>Company: {company}</h4>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );
}

export default JobCard;