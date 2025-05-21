import React, { useEffect } from 'react';
import { KEY } from '../../config';
import StarRating from '../StarRating';
const MovieDetail = ({ selectedId, watchedMovieRating, onBackToHome, onAddWatched, isWatched }) => {
  const [movie, setMovie] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const handelAddWatched = () => {
    onAddWatched({
      imdbID: selectedId,
      title,
      Poster: poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(' ').at(0)),
    });
    onBackToHome();
  };
  useEffect(() => {
    const cb = (e) => {
      if (e.key === 'Escape') {
        onBackToHome();
      }
    };
    document.addEventListener('keydown', cb);
    return () => document.removeEventListener('keydown', cb);
  });
  useEffect(() => {
    if (!selectedId) return;
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}&plot=full`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);
  //   设置页面标题
  useEffect(() => {
    console.log('effect runs');
    if (!movie?.Title) return;
    document.title = `${movie.Title} - MovieDOUBAN`;
    return () => {
      document.title = 'MovieDOUBAN';
      console.log('cleanup runs');
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <header>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    color="#ffa500"
                    size="2"
                    onChange={(rating) => setUserRating(rating)}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handelAddWatched}>
                      +标记为已观看
                    </button>
                  )}
                </>
              )}
              {isWatched && (
                <span className="watched-message">
                  您将{title}评价为{watchedMovieRating}⭐️
                </span>
              )}
            </div>
          </section>
          <section>
            <p>{plot}</p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      <button className="btn-back" onClick={onBackToHome}>
        &larr;
      </button>
    </div>
  );
};

export default MovieDetail;
