import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/api";

import JobListCard from "./JobListCard";

function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState({
    isLoading: true,
    isLoadingError: false,
    data: null
  });

  useEffect(function fetchAndSetCompany() {

    async function fetchCompany() {
      try {
        const resp = await JoblyApi.getCompany(handle);
        setCompany(prevState => ({
          isLoading: false,
          isLoadingError: false,
          data: resp
        }));
      } catch (err) {
        setCompany(prevState => ({
          ...prevState,
          isLoadingError: true
        }));
      }

    }
    fetchCompany();
  }, []);

  if (company.isLoadingError) return <h1>Problems fetching data...</h1>;
  if (company.isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{company.data.name}</h1>
      <h2>{company.data.description}</h2>

      <JobListCard jobs={company.data.jobs} companyName={company.data.name} />
    </div>
  );
}


export default CompanyDetail;