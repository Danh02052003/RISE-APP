import React from 'react';
import '../styles/Search.css';

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-activity">
        <div className='background-img'>
          <img src={`${process.env.PUBLIC_URL}/images/search.svg`} alt='notification' className='seach-img' />
        </div>
        <input 
          type="text" 
          placeholder="Search for activities, challenges" 
          className="search-input" 
        />
      </div>
      
      <div className="search-location">
        <div className='background-img'>
          <img src={`${process.env.PUBLIC_URL}/images/icon/location.svg`} alt='location' className='location-img' />
        </div>
        <input 
          type="text" 
          placeholder="Ho Chi Minh City" 
          className="search-input" 
        />
        <button className="search-location-img">
            <img src={`${process.env.PUBLIC_URL}/images/search.svg`} alt='notification' />
        </button>
      </div>
    </div>
  );
};

export default Search;