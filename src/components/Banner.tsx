import "./banner.css";
import "../styles/banner.css";
import React, { useEffect, useState } from "react";
import axios from "../lib/tmdb";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/trending/all/week");
      const results = request.data.results;
      setMovie(results[Math.floor(Math.random() * results.length)]);
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original/${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">
          {movie?.overview?.length > 150
            ? movie?.overview.substring(0, 150) + "..."
            : movie?.overview}
        </p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
