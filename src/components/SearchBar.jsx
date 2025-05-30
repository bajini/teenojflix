import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) return;

    const fetchResults = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bb8b5e2ab9c10ba8a03ed864de2a5b6d&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data.results.slice(0, 5)); // top 5 results
    };

    fetchResults();
  }, [query]);

  const handleSelect = (id) => {
    setQuery("");
    setResults([]);
    navigate(`/movie/${id}`);
  };

  return (
    <div className="relative mb-6 w-full max-w-md">
      <input
        className="w-full p-3 rounded-lg text-black"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      {results.length > 0 && (
        <ul className="absolute z-10 bg-white text-black w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((movie) => (
            <li
              key={movie.id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleSelect(movie.id)}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-10 h-14 rounded"
                />
              )}
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
