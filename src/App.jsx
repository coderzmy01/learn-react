import { useEffect, useState } from 'react';
import MovieDetails from './components/MovieDetail';
import Box from './components/MovieList';
import MovieListBox from './components/MovieList/components/MovieListBox';
import SearchBar from './components/SearchBar';
import Summary from './components/WatchedMovie/components/Summary';
import WatchedMovieList from './components/WatchedMovie/components/WatchedMovieList';
import { KEY } from './config';

const Loader = () => {
  return <div className="loader">Loading...</div>;
};
const ErrorMessage = ({ message }) => {
  return <div className="error">{message}</div>;
};
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('The Matrix');
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedMovieRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
  const loadMovies = async (query) => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      if (!res.ok) throw new Error('Something went wrong');
      const data = await res.json();
      if (data.Response === 'False') throw new Error('No movies found');
      setMovies(data.Search);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handelSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handelBackToHome = () => {
    setSelectedId(null);
  };
  const handelAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handelDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    loadMovies(query);
  }, [query]);

  return (
    <>
      <SearchBar movies={movies} query={query} onChange={setQuery} />
      <main className="main">
        <Box>
          {isLoading && <div className="loader">Loading...</div>}
          {!isLoading && !error && (
            <MovieListBox movies={movies} onSelectMovie={handelSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              isWatched={isWatched}
              watchedMovieRating={watchedMovieRating}
              setSelectedId={setSelectedId}
              onAddWatched={handelAddWatched}
              onBackToHome={handelBackToHome}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} onDeleteWatched={handelDeleteWatched} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
