import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

const MovieRow = ({ title, fetchUrl }: { title: string; fetchUrl: string }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-scroll space-x-2 scrollbar-hide">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="rounded hover:scale-110 duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
