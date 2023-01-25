import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";


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

  async function handleSearch(term) {

    setCompanies(prevState => ({
      ...prevState,
      isLoading: true
    }));

    //TODO: Do we want to show message "Searching..."

    try {
      const resp = await JoblyApi.searchCompanies(term);
      console.log("resp=", resp);
      setCompanies(({
        isLoading: false,
        companies: resp
      }));
    } catch (err) {
      setCompanies(prevState => ({
        ...prevState,
        isLoadingError: true
      }))
    }
  }

  if (companies.isLoadingError) return <h2>Problems fetching data...</h2>;

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