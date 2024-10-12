import React from 'react'
import '../styles/Search.css'

export default function Search(){
    return (
    <div className="search-container">
      <img  src={`${process.env.PUBLIC_URL}/images/search.svg`} alt='search'/>
      <input type="text" placeholder="Search for activities, challenges" className="search-input" />
    </div>
    )
}

