import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default Search;
