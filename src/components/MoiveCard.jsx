import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, AddToFavorite,RemoveFromFavorite} = useMovieContext();

  const favorite = isFavorite(movie.id);

  function OnFavoriteClick(event) {
    event.preventDefault();
    if (favorite) RemoveFromFavorite(movie.id);
    else AddToFavorite(movie);
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={OnFavoriteClick}
          >
             ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}
export default MovieCard;
