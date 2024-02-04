import React from 'react';

const SearchBar = ({ onSearchChange }) => {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div>
      <label>
        Search Transactions:
        <input type="text" onChange={handleChange} />
      </label>
    </div>
  );
};

export default SearchBar;
