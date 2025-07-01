import { useEffect, useState } from 'react';
import MovieDetails from './components/MovieDetail';
import Box from './components/MovieList';
import MovieListBox from './components/MovieList/components/MovieListBox';
import SearchBar from './components/SearchBar';
import Summary from './components/WatchedMovie/components/Summary';
import WatchedMovieList from './components/WatchedMovie/components/WatchedMovieList';
import { useMovies } from './hooks/useMovies';

const Loader = () => {
  return <div className="loader">Loading...</div>;
};
const ErrorMessage = ({ message }) => {
  return <div className="error">{message}</div>;
};
export default function App() {
  // 使用useState的初始值为函数，可以避免在组件渲染时重复调用函数
  const [watched, setWatched] = useState(() => {
    const storedWatched = localStorage.getItem('watched');
    return storedWatched ? JSON.parse(storedWatched) : [];
  });
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedMovieRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
  const { movies, isLoading, error } = useMovies(query);

  const handelSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handelBackToHome = () => {
    setSelectedId(null);
  };
  // 处理添加到已观看列表
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
