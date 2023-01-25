import { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";


function CompanyList() {

  const [companies, setCompanies] = useState({
    isLoading: true,
    companies: []
  });

  useEffect(function fetchAndSetCompanies() {
    async function fetchCompanies() {
      handleSearch();
    }
    fetchCompanies();
  }, []);

  async function handleSearch(term) {


    try {
      const resp = await JoblyApi.getCompanies(term);
      setCompanies(({
        isLoading: false,
        companies: resp
      }));
    } catch (err) {
      return <h2>Problems fetching data...</h2>
    }
  }
  //TODO: create spinner component & error handling component
  if (companies.isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />
      {companies.companies.length > 0 && companies.companies.map(c => (
        <CompanyCard
          key={c.handle}
          description={c.description}
          handle={c.handle}
          logo={c.logoUrl} />
      ))}
      {companies.companies.length === 0 && <h2>No companies found.</h2>}
    </div>
  );
}

export default CompanyList;