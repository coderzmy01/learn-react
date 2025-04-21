import React from 'react';
import MovieItem from '../../../MovieItem';
const WatchedMovieList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <>
          <MovieItem key={movie.imdbID} movie={movie}>
            <>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
            </>
          </MovieItem>
        </>
      ))}
    </ul>
  );
};

export default WatchedMovieList;
