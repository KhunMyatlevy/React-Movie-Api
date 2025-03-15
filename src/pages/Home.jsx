import "../css/Home.css";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api.js";
import MovieCard from "../components/MoiveCard";

function Home() {
  const [search, setSearch] = useState("");

  const [movies, setMovies] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
        setError("Failed to load movie...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!search.trim())return
    setLoading(true);
    if (loading)return

    try{
      const searchResults = await searchMovies(search);
      setMovies(searchResults);
      setError(null);

    }catch(error){
      console.log(error)
      setError("Falied to serach movies ...")
    }finally{
      setLoading("")
    }
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movie ..."
          className="search-input"
          value={search}
          onChange={(event) => handleSearchInput(event)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>} 

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
