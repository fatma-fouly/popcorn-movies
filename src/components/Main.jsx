import { useState } from "react"
import '../App.css'
import ListBox from "./ListBox";
import WatchedMovie from "./WatchedMovie";

const average = (arr) => (arr.length ? arr.reduce((a, c) => a + c, 0) / arr.length : 0);

export default function Main( {movies, watched} ) {
  
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div>
       <main className="main">
       <ListBox movies={movies} setIsOpen1={setIsOpen1}  isOpen1={isOpen1}/>
       <WatchedMovie watched={watched} avgImdbRating={avgImdbRating} avgUserRating={avgUserRating} avgRuntime={avgRuntime} isOpen2={isOpen2} setIsOpen2={setIsOpen2} />
      </main>
    </div>
  )
}
