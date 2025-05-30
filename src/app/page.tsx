import MovieRow from "../components/MovieRow";
import requests from "../lib/tmdb";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen">
      <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
      <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
    </main>
  );
}
