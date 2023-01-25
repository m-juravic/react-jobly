import JobCard from "./JobCard";

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