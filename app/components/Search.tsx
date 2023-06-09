"use client"
import Image from "next/image"
import Link from "next/link"
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
        <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
          <h2>{recipe.title}</h2>
          <Image
            alt={recipe.title}
            width={100}
            height={100}
            src={recipe.image}
          />
        </Link>
      ))}
    </div>
  )
}

export default Search
