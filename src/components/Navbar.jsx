import React from 'react'
import '../App.css'
import Search from './Search'


export default function Navbar({query, setQuery, movies}) {
      
    
  return (
    <div>
       <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
      <Search  query={query}  setQuery={setQuery} />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
    </div>
  )
}
