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
  // 使用useState的初始值为函数，可以避免在组件渲染时重复调用函数
  const [watched, setWatched] = useState(() => {
    const storedWatched = localStorage.getItem('watched');
    return storedWatched ? JSON.parse(storedWatched) : [];
  });
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedMovieRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
  const controller = new AbortController();

  const loadMovies = async (query) => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('Something went wrong');
      const data = await res.json();
      if (data.Response === 'False') throw new Error('No movies found');
      setError(null);
      setMovies(data.Search);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
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
  // 使用useEffect来监听watched的变化，并将其存储到localStorage中
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    handelBackToHome();
    loadMovies(query);
    return () => {
      controller.abort();
    };
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
