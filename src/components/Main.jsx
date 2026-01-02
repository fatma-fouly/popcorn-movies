import { useState } from "react"
import '../App.css'
import ListBox from "./ListBox";
import WatchedMovie from "./WatchedMovie";


export default function Main({ movies, watched, MovieDetails,
   selectedId, onSelectMovie ,onCloseMovie , onAddWatched}) {

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  

  return (
    <div>
      <main className="main">
       
          <>
           <ListBox movies={movies} setIsOpen1={setIsOpen1} isOpen1={isOpen1}  onSelectMovie={onSelectMovie} />
           <WatchedMovie watched={watched}  isOpen2={isOpen2}
               setIsOpen2={setIsOpen2}  onSelectMovie={onSelectMovie} MovieDetails={MovieDetails} 
               selectedId={selectedId}  onCloseMovie={onCloseMovie}  onAddWatched={onAddWatched}  />
             
          </>
      </main>
    </div>
  )
}
