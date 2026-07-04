import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { fetchMovieDetails, fetchMovies } from "./api";
import "./styles/App.css";

const genreOptions = ["Action", "Comedy", "Drama", "Sci-Fi", "Romance", "Thriller", "Animation"];
const languageOptions = ["English", "Hindi", "Spanish", "French", "Japanese", "Korean"];

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genre, setGenre] = useState("Drama");
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Search for a title to see results and rich movie details.");

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setMovies([]);
      setSelectedMovie(null);
      setStatusMessage("Type a movie title to begin exploring.");
      return;
    }

    setIsLoading(true);
    setSelectedMovie(null);
    setStatusMessage("Searching for matching films...");

    try {
      const results = await fetchMovies(trimmedQuery);
      setMovies(results);
      if (results.length > 0) {
        setStatusMessage(`Showing ${results.length} results for “${trimmedQuery}”. Pick a movie to see awards, cast, language, and more.`);
      } else {
        setStatusMessage("No titles found. Try a different keyword or browse by genre and language below.");
      }
    } catch (error) {
      setMovies([]);
      setStatusMessage("We could not fetch movie data right now. Please try again shortly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = async (movie) => {
    setDetailsLoading(true);
    setSelectedMovie(null);

    try {
      const details = await fetchMovieDetails(movie.imdbID);
      setSelectedMovie(details);
    } catch (error) {
      setSelectedMovie({
        ...movie,
        Plot: "Details are temporarily unavailable for this title.",
        Genre: "Movie",
        Language: "Unknown",
        Awards: "Not listed",
        Actors: "Cast details unavailable"
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleGenreLanguageSearch = async (e) => {
    e.preventDefault();
    await handleSearch(`${genre} ${language} movie`);
  };

  return (
    <div className="App">
      <section className="hero-panel">
        <span className="eyebrow">CINEMA EXPLORER</span>
        <h1>Find the story behind every film</h1>
        <p>
          Search by title for instant movie results, then unlock richer details like awards,
          language, cast, genre, and a quick look at the story.
        </p>
      </section>

      <section className="search-section">
        <SearchBar onSearch={handleSearch} />

        <form className="discover-form" onSubmit={handleGenreLanguageSearch}>
          <label>
            <span>Genre</span>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              {genreOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Language</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Discover</button>
        </form>
      </section>

      <section className="results-section">
        <div className="status-pill">{statusMessage}</div>

        {isLoading ? (
          <p className="loading-text">Loading matching movies...</p>
        ) : movies.length > 0 ? (
          <>
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              selectedMovieId={selectedMovie?.imdbID || null}
            />

            <div className="details-card">
              {detailsLoading ? (
                <p className="loading-text">Loading movie details...</p>
              ) : selectedMovie ? (
                <>
                  <div className="details-header">
                    <div>
                      <p className="details-label">Featured title</p>
                      <h2>{selectedMovie.Title}</h2>
                    </div>
                    <span className="tag">{selectedMovie.Year || "Unknown year"}</span>
                  </div>

                  <div className="details-grid">
                    <div>
                      <h3>Story</h3>
                      <p>{selectedMovie.Plot || "A compelling story awaits discovery."}</p>
                    </div>
                    <div>
                      <h3>Quick facts</h3>
                      <ul>
                        <li><strong>Genre:</strong> {selectedMovie.Genre || "Unknown"}</li>
                        <li><strong>Language:</strong> {selectedMovie.Language || "Unknown"}</li>
                        <li><strong>Released:</strong> {selectedMovie.Released || "Not listed"}</li>
                        <li><strong>Runtime:</strong> {selectedMovie.Runtime || "Not listed"}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="details-grid second-row">
                    <div>
                      <h3>Cast & crew</h3>
                      <p>{selectedMovie.Actors || "Cast details unavailable"}</p>
                      <p><strong>Director:</strong> {selectedMovie.Director || "Unknown"}</p>
                    </div>
                    <div>
                      <h3>Awards & recognition</h3>
                      <p>{selectedMovie.Awards || "No award information listed"}</p>
                      <p><strong>Ratings:</strong> {selectedMovie.Ratings?.[0]?.Value || "Not rated yet"}</p>
                    </div>
                  </div>

                  <div className="soundtrack-box">
                    <h3>Signature vibe</h3>
                    <p>
                      {selectedMovie.Soundtrack || "This title carries a memorable cinematic energy, blending emotion, style, and storytelling into a striking experience."}
                    </p>
                  </div>
                </>
              ) : (
                <p className="empty-state">Choose one of the movies above to reveal its story, cast, awards, and more.</p>
              )}
            </div>
          </>
        ) : (
          <p className="empty-state">No titles found. Try a new search or use the genre and language filters.</p>
        )}
      </section>
    </div>
  );
}

export default App;
