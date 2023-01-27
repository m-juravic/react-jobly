import JobCard from "./JobCard";

/**
 * Creates individual job cards
 *
 * Prop:
 * - jobs
 *
 * {JobList} => JobListCard
 */

function JobListCard({ jobs }) {
  return (
    <>
      {jobs.map(j => (
        <JobCard
          key={j.id}
          id={j.id}
          title={j.title}
          salary={j.salary}
          equity={j.equity}
          company={j.companyName}
        />
      ))}
    </>
  );
}

export default JobListCard;