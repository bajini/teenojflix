import React, { useEffect, useState } from "react";
import MovieList from "./MovieList"; // Assuming this path is correct

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Example fetch (replace URL with your API or data source)
    fetch("https://example.com/api/movies")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎬 TeenojFlix</h1>

      {error ? (
        <p>Could not load movies.</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}

export default App;
