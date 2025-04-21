import React from 'react';
import MovieItem from '../../../MovieItem';
const MovieListBox = ({ movies }) => {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID}>
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
