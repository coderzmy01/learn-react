import { useEffect, useState } from 'react';
import { KEY } from '../config';

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
  useEffect(() => {
    // handelBackToHome();
    loadMovies(query);
    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
};
