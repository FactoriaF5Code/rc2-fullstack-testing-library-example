import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar';

function App() {

  const [results, setResults] = useState([]);

  const updateSearchResults = (query) => {
    fetch(`http://localhost:8080/books?q=${query}`)
      .then(response => response.json())
      .then(body => setResults(body.results));
  }

  return (
    <>
      <SearchBar onQueryChange={updateSearchResults} />
      {results.map((r, i) => <p key={i}>{r.title}</p>)}
    </>
  )
}

export default App
