import { useState, useEffect} from "react";
import JoblyApi from "./api";
import JobListCard from "./JobListCard"
import SearchForm from "./SearchForm"

function JobList() {

  const [jobs, setJobs] = useState({
    isLoading: true,
    isLoadingError: false,
    jobs: []
  });


  useEffect(function fetchAndSetJobs() {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(({
          isLoading: false,
          jobs
        }))
      } catch (err) {
        setJobs(prevState => ({
          ...prevState,
          isLoadingError: true
        }));
      }
    }
    fetchJobs();
  }, []);

  async function handleSearch(term) {
    setJobs(prevState => ({
      ...prevState,
      isLoading: true
    }))

    try {
      const resp = await JoblyApi.searchForJobs(term);
      setJobs(({
        isLoading: false,
        jobs: resp
      }))
    } catch (err) {
      setJobs(prevState => ({
        ...prevState,
        isLoadingError: true
      }))
    }
  }

  if (jobs.isLoadingError) return <h2>Problems fetching data...</h2>;

  if (jobs.isLoading) return <h2>Loading...</h2>;


  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      <JobListCard jobs={jobs.jobs}/>
    </div>

  );
}

export default JobList;