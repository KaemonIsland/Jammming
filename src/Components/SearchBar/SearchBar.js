import React, { useState } from 'react';
import './SearchBar.css';


const SearchBar = ({ onSearch }) => {
  let [term, setTerm] = useState('');

  let search = () => onSearch(term);

  let handleTermChange = e => setTerm(e.target.value);

  return (
    <div className="SearchBar">
      <input  placeholder="Enter A Song, Album, or Artist"
              onChange={handleTermChange}/>
      <button onClick={search}>SEARCH</button>
    </div>
  )
}

export default SearchBar;