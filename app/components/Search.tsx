"use client"
import React, { useState } from "react"

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      fetchData()
    }
  }

  const fetchData = () => {
    // Perform the fetch request with the search query
    // Example:
    fetch(`${process.env.NEXT_PUBLIC_API}${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data
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
    </div>
  )
}

export default Search
