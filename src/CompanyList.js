import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList() {

  const [companies, setCompanies] = useState({
    isLoading: true,
    companies: []
  });

  useEffect(function fetchAndSetCompanies(){
    async function fetchComapnies(){
      const companies = await JoblyApi.getCompanies();
      setCompanies(({
        ...companies,
        isLoading: false,
        companies
      }))
    }
    fetchComapnies()
  }, [])

  // console.log("companies=", companies)

  if(companies.isLoading) return <h2>Loading...</h2>

  return (
    // TODO: Form
    <div>
      {companies.companies.map(c => <CompanyCard key={c.handle} handle={c.handle}/>)}
    </div>
  );
}

export default CompanyList;