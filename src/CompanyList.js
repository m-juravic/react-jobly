import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList() {

  const [companies, setCompanies] = useState({
    isLoading: true,
    isLoadingError: false,
    companies: []
  });

  useEffect(function fetchAndSetCompanies() {
    async function fetchCompanies() {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(({
          isLoading: false,
          companies
        }));
      } catch (err) {
        setCompanies(prev => ({
          ...prev,
          isLoadingError: true
        }));
      }
    }
    fetchCompanies();
  }, []);

  if (companies.isLoadingError) return <h2>Problems fetching data...</h2>;

  if (companies.isLoading) return <h2>Loading...</h2>;

  return (
    // TODO: Form
    <div>
      {companies.companies.map(c => (
        <CompanyCard
          key={c.handle}
          handle={c.handle}
          logo={c.logoUrl} />
      ))}
    </div>
  );
}

export default CompanyList;