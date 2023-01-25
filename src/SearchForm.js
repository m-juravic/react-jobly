import { useState } from "react";
import "./SearchForm.css";


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
    evt.preventDefault()
    handleSearch(formData.searchTerm.trim())
    setFormData({searchTerm: ""})
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          name="searchTerm"
          onChange={handleChange}
          value={formData.searchTerm}
          placeholder="Enter search term.."
          minLength={3}
          required
          />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;