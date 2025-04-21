import React from 'react';
import Summary from './components/Summary';
import WatchedMovieList from './components/WatchedMovieList';

const WatchedMovie = ({ watched }) => {
  const [isOpen2, setIsOpen2] = React.useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <Summary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
};

export default WatchedMovie;
