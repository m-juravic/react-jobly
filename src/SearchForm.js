import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {

  const [formData, setFormData] = useState({
    searchTerm: ""
  });

  function handleChange(evt) {
    setFormData(fData => ({
      searchTerm: evt.target.value
    }));
  }

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