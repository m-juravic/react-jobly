import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList() {

  //add error handling and try/catch in api call
  const [companies, setCompanies] = useState({
    isLoading: true,
    companies: []
  });

  useEffect(function fetchAndSetCompanies(){
    async function fetchCompanies(){
      const companies = await JoblyApi.getCompanies();
      setCompanies(({
        isLoading: false,
        companies
      }))
    }
    fetchCompanies()
  }, [])

  // console.log("companies=", companies)

  if(companies.isLoading) return <h2>Loading...</h2>

  return (
    // TODO: Form
    //TODO: handle default logo
    <div>
      {companies.companies.map(c => (
      <CompanyCard
        key={c.handle}
        handle={c.handle}
        logo={c.logoUrl}/>
      ))}
    </div>
  );
}

export default CompanyList;