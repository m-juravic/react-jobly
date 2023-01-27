import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

/**
 *Search Form for both jobs and companies
 *
 * Props:
 * -handleSearch()
 *
 * State:
 * -formData
 *
 * {CompanyList or JobList} => SearchForm
 *
 */
function SearchForm({ handleSearch }) {

  const [formData, setFormData] = useState({
    searchTerm: ""
  });

  /** Update form input. */
  function handleChange(evt) {
    setFormData(fData => ({
      searchTerm: evt.target.value
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(formData.searchTerm.trim());
    setFormData({ searchTerm: "" });
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            name="searchTerm"
            onChange={handleChange}
            value={formData.searchTerm}
            minLength={3}
            placeholder="Enter search term..."
            aria-label="search"
            aria-describedby="search"
            required
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}

export default SearchForm;