import { useState } from "react"

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const Search = (props: SearchProps) => {
  const { query, setQuery } = props

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies ..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}

export default Search