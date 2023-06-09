"use client"
import Image from "next/image"
import React, { useState } from "react"

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState({ results: [] })

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      fetchData()
    }
  }

  const fetchData = () => {
    // Perform the fetch request with the search query
    // Example:
    fetch(
      `${process.env.NEXT_PUBLIC_RECIPE}complexSearch${process.env.NEXT_PUBLIC_KEY}&query=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data
        setResults(data)
        console.log(data)
      })
      .catch((error) => {
        // Handle the error
        console.error(error)
      })
  }

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={fetchData}>Search</button>

      {results.results.map((recipe: any) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <Image
            alt={recipe.title}
            width={100}
            height={100}
            src={recipe.image}
          />
        </div>
      ))}
    </div>
  )
}

export default Search
