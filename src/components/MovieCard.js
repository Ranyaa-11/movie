import React from "react";
import "../styles/MovieCard.css";

function MovieCard({ movie, onSelectMovie, isSelected }) {
  return (
    <article
      className={`movie-card ${isSelected ? "active" : ""}`}
      onClick={() => onSelectMovie(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectMovie(movie);
        }
      }}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
        alt={movie.Title}
      />
      <div className="movie-card-body">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <span className="movie-pill">View details</span>
      </div>
    </article>
  );
}

export default MovieCard;
