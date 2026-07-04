const API_KEY = "357ba564";
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(query) {
  const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&type=movie&apikey=${API_KEY}`);
  const data = await response.json();
  return Array.isArray(data.Search) ? data.Search : [];
}

export async function fetchMovieDetails(imdbID) {
  const response = await fetch(`${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`);
  return response.json();
}
