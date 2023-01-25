import "./JobCard.css";
import convertAndFormat from "./helpers/currencyConverter"

/**
 *Simple presentation component for Job
 *
 * Props:
 * -id, title, salary, company, equity
 *
 * {JobListCard} => JobCard
 */

function JobCard({ id, title, salary, company, equity }) {
  return (
    <div className="JobCard" id={id}>
      <h3>Title: {title}</h3>
      <h4>Company: {company}</h4>
      <p>Salary: ${convertAndFormat(salary)}</p>
      {equity && <p>Equity: {equity}</p>}
    </div>
  );
}

export default JobCard;