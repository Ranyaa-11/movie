import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, onSelectMovie, selectedMovieId }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
          isSelected={selectedMovieId === movie.imdbID}
        />
      ))}
    </div>
  );
}

export default MovieList;
