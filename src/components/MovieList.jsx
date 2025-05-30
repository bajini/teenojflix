import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieList = ({ movies = [] }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (movieId) => {
    const updated = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {movies.map((movie) => (
        <div key={movie.id} style={{ width: "150px", textAlign: "center", position: "relative" }}>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "black" }}>
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <p>No poster</p>
            )}
            <h4>{movie.title}</h4>
          </Link>
          <button
            onClick={() => toggleFavorite(movie.id)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: favorites.includes(movie.id) ? "red" : "#ccc",
            }}
          >
            ♥
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
