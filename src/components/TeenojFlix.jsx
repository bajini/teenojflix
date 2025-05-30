import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";

const TeenojFlix = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=bb8b5e2ab9c10ba8a03ed864de2a5b6d=${page}`);
        const data = res.data;
        setMovies(data.results || []);
      } catch (err) {
        setError("Could not load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Now Streaming (Page {page})</h2>

      <SearchBar />

      <input
        type="text"
        placeholder="Filter movies by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "300px",
          fontSize: "16px",
        }}
      />

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <MovieList
            movies={filteredMovies.map((m) => ({
              id: m.id,
              title: m.title,
              poster: m.poster_path
                ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                : null,
            }))}
          />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              style={{ marginRight: "10px", padding: "10px 20px" }}
            >
              ⬅ Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              style={{ padding: "10px 20px" }}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TeenojFlix;
