import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children  }) => {
  const [favorites, setFavorite] = useState([]);

  useEffect(() => {
    const storedFav = localStorage.getItem("favorites");

    if (storedFav) setFavorite(JSON.parse(storedFav));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const AddToFavorite = (movie) => {
    setFavorite((prev) => [...prev, movie]);
  };

  const RemoveFromFavorite = (movieId) => {
    setFavorite((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    AddToFavorite,
    RemoveFromFavorite,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children }</MovieContext.Provider>
  );
};
