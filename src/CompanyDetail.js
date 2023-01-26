import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/api";

import JobListCard from "./JobListCard";
import Loader from "./Loader";
import NotFound from "./NotFound";

/**
 * Shows company detail
 *
 * useParams:
 * - handle
 *
 * State:
 * - company [isLoading:true, data: {
      "handle": "anderson-arias-morrow",
      "name": "Anderson, Arias and Morrow",
      "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
      "numEmployees": 245,
      "logoUrl": "/logos/logo3.png"
    }]
 *
 * {JobList} => JobListCard
 */

function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState({
    isLoading: true,
    data: null
  });

  useEffect(function fetchAndSetCompany() {

    async function fetchCompany() {
      try {
        const resp = await JoblyApi.getCompany(handle);
        setCompany(prevState => ({
          isLoading: false,
          data: resp
        }));
      } catch (err) {
        return <NotFound message="Problems fetching company data..." />;
      }

    }
    fetchCompany();
  }, []);

  if (company.isLoading) return <Loader />;

  return (
    <div>
      <h1>{company.data.name}</h1>
      <h2>{company.data.description}</h2>

      <JobListCard jobs={company.data.jobs} companyName={company.data.name} />
    </div>
  );
}


export default CompanyDetail;