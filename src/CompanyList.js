import { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import Loader from "./Loader";

import ListGroup from 'react-bootstrap/ListGroup';


/**
 * Lists Companies
 *
 * State:
 * - companies [isLoading: true, companies: [{
      "handle": "anderson-arias-morrow",
      "name": "Anderson, Arias and Morrow",
      "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
      "numEmployees": 245,
      "logoUrl": "/logos/logo3.png"
    },,...]]
 *
 * {RouteList} => CompanyList
 */

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
      // console.log("IN here!!!")
      // return <NotFound message="Problems fetching data..." />;
      return <h2>Problems fetching data...</h2>;

    }
  }

  if (companies.isLoading) return <Loader />;

  return (
    <div>
      <SearchForm handleSearch={handleSearch} />

      <ListGroup>
        {companies.companies.length > 0 && companies.companies.map(c => (
          <CompanyCard
            key={c.handle}
            description={c.description}
            handle={c.handle}
            logo={c.logoUrl} />
        ))}
      </ListGroup>








      {/*
      {companies.companies.length > 0 && companies.companies.map(c => (

      ))}
      {companies.companies.length === 0 && <h2>No companies found.</h2>} */}
    </div>
  );
}

export default CompanyList;