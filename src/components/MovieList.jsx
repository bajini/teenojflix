import React, { useState, useEffect } from 'react';
import './MovieApp.css';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Sample data
    const sampleMovies = [
      {
        id: 1,
        title: 'RRR',
        poster: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
      },
      {
        id: 2,
        title: 'Pushpa',
        poster: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Pushpa_-_The_Rise_%282021_film%29.jpg',
      },
      {
        id: 3,
        title: 'Kantara',
        poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Kantara_film_poster.jpg',
      },
    ];

    try {
      setMovies(sampleMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
      setError(true);
    }
  }, []);

  return (
    <div className="movie-container">
      <h1>🎬 TeenojFlix</h1>
      {error ? (
        <p>Could not load movies.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieApp;
