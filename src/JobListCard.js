import JobCard from "./JobCard";

/**
 * Creates individual job cards
 *
 * Prop:
 * - jobs, companyName
 *
 * {JobList} => JobListCard
 */

function JobListCard({ jobs, companyName }) {
  return (
    <>
      {jobs.map(j => (
        <JobCard
          key={j.id}
          id={j.id}
          title={j.title}
          salary={j.salary}
          equity={j.equity}
          company={companyName}
        />
      ))}
    </>
  );
}

export default JobListCard;