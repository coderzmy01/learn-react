import React from 'react';
import MovieItem from '../../../MovieItem';
const MovieListBox = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </MovieItem>
      ))}
    </ul>
  );
};

export default MovieListBox;
