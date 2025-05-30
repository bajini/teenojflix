import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bb8b5e2ab9c10ba8a03ed864de2a5b6d`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Back to Home</Link>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "8px" }}
      />
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
    </div>
  );
};

export default MovieDetail;
