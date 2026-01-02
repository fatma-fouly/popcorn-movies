import React from 'react'
import WatchedSummery from './WatchedSummery'

export default function WatchedMovie({ watched, avgImdbRating,
  avgUserRating, avgRuntime, isOpen2, setIsOpen2, onCloseMovie  ,MovieDetails , selectedId ,onAddWatched , HandleCloseMovie}) {
  return (

    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
         {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={onCloseMovie} onAddWatched={onAddWatched} HandleCloseMovie={HandleCloseMovie}  />
         :  <>
          <WatchedSummery watched={watched} avgImdbRating={avgImdbRating} avgUserRating={avgUserRating}
           avgRuntime={avgRuntime} />
          <ul className="list">
            {watched.map((movie) => (
              <li key={movie.ImdbID}  >
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.ImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.Runtime} min</span>
                  </p>                    </div>
              </li>
            ))}
          </ul>   </> }
        </>
      )}
    </div>
  )
}
