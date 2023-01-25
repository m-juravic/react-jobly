import { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
import JobListCard from "./JobListCard";
import NotFound from "./NotFound";
import SearchForm from "./SearchForm";

/**
 * Lists jobs
 *
 * State:
 * -jobs [isLoading: true, jobs: [{
      "id": 1,
      "title": "Conservator, furniture",
      "salary": 110000,
      "equity": "0",
      "companyHandle": "watson-davis",
      "companyName": "Watson-Davis"
    },...]]
 *
 * {RouteList} => JobList
 */

function JobList() {

  const [jobs, setJobs] = useState({
    isLoading: true,
    jobs: []
  });


  useEffect(function fetchAndSetJobs() {
    async function fetchJobs() {
      handleSearch()
    }
    fetchJobs();
  }, []);

  async function handleSearch(term) {
    try {
      // TODO: update searchForJobs
      const resp = await JoblyApi.getJobs(term);
      setJobs(({
        isLoading: false,
        jobs: resp
      }));
    } catch (err) {
      // return <h2>Problems fetching data...</h2>
      return <NotFound message="Problems fetching job data..." />
    }
  }

  if (jobs.isLoading) return <h2>Loading...</h2>;


  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      <JobListCard jobs={jobs.jobs} />
      {jobs.jobs.length === 0 && <h2>No jobs found.</h2>}
    </div>
  );
}

export default JobList;