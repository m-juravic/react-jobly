import convertAndFormat from "./helpers/currencyConverter";

import ListGroup from 'react-bootstrap/ListGroup';

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
    <ListGroup.Item >
      <div id={id}>
        <h3>Title: {title}</h3>
        <p>Company: {company}</p>
        <p>Salary: ${convertAndFormat(salary)}</p>
        {equity && <p>Equity: {equity}</p>}
      </div>
    </ListGroup.Item>
  );
}

export default JobCard;