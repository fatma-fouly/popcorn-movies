import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import StarRating from "./components/StarRating";
import { useRef } from "react";
import { useMovies } from "./components/useMovies";
import { useLocalStorage } from "./components/useLocalStorage";

const KEY = '7c0905a0'

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function Loader() {
  return <p>   Loader ...  </p>
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
 
  const [watched, setWatched] = useState(function(){
    const storedWatched = localStorage.getItem('watched');
    return JSON.parse(storedWatched);
  });
  const {movies, isLoading, error} = useMovies(query);

  function  HandleSelectMovie(id) {
    setSelectedId(selectedId=> id=== selectedId ? null  : id )
  }

  function HandleCloseMovie() {
    setSelectedId(null)
    }
    
  function handleDeleteMovie(id){
    setWatched(watched=> watched.filter(movie => movie.imdbID !== id))
  }  
  function handleAddWatched(movie){
    setWatched(watched  => [...watched, movie]);
    // localStorage.setItem('watched' , JSON.stringify([...watched, movie]))
  }

  useEffect(function(){
    localStorage.setItem('watched' , JSON.stringify(watched) )
  }
    , [watched])

    function MovieDetails({selectedId, onCloseMovie , onAddWatched , watched}) {
   
     const [isLoading , setIsLoading] = useState(false);
     const [movie , setMovie] = useState({});
     const [userRating , setUserRating] = useState('');
     const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
     const watcedUserRating = watched.find(movie => movie.imdbID ===selectedId)?.userRating;      
     const {Title,Plot, Poster, Runtime, imdbRating, Rated , Released , Actors, Director, Genre , Year } = movie
     const  [isTop , setIsTop] = useState(imdbRating > 8 ) ;
      const countRef= useRef(0);
    
    useEffect(function(){
     if(userRating) countRef.current = countRef.current++;
    } , [userRating])
    function addMovie(){
     const  newWatchedList ={
      imdbID: selectedId,
      Title,
      Poster,
      Year,
      Runtime: Number(Runtime.split(" ")[0]),
      imdbRating: Number(imdbRating),
      userRating,
      countUserRatingDecisions: countRef.current
     }   
     onAddWatched(newWatchedList);
     onCloseMovie();
    }

    useEffect(function(){  // close the movie section when enter esc button 
       function callback(e){
       if (e.key === "Escape") {
       onCloseMovie();
      } }
       
       document.addEventListener("keydown" , callback)

      return function(){
        document.removeEventListener('keydown', callback )
      }
  }, [onCloseMovie])
    useEffect(function(){
      async function getMovieDetils(){
       setIsLoading(true); 
       const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
       const data  = await res.json();
      //  console.log(data);
       setMovie(data);
       setIsLoading(false);
      }
      getMovieDetils();
    } , [selectedId])

    useEffect( function(){
      if( !Title ) return;
      document.title  = `Movie: ${Title}`
      return function cleanup() {
      document.title = "UsePopcorn" ; 
      // console.log(`cleaning up from movie : ${Title}`)
    }}
    , [Title])

    return(
    <div className="details">
     { isLoading ?  <Loader  /> :
  <>
<header>
      <button className="btn-back" onClick={()=>{onCloseMovie()}}> &larr; </button>
      <img src={Poster} alt={Title}  />
      <div className="details-overview">  
        <h2 className="me-auto">{Title}</h2>
        <p className="fw-bold"> {Released } &bull;   {Runtime} </p>
        <p>{Genre}
          <span className="fw-bold">⭐️ {imdbRating} </span>
        </p>
        </div>
    </header>
    <section>
      <div className="rating pt-4">
       {!isWatched?< ><StarRating maxRating={10} size={24} onRating={setUserRating} />
        {userRating > 0 && ( <button className="btn-add"  onClick={addMovie}> + Add To Watched </button>) } </>
        : <h4>You already rated this movie  {watcedUserRating}</h4> }

      </div>
      <p>
        <em>{Plot}</em>
      </p>
      <p>
        <strong>stars :</strong> {Actors}
      </p>
      <p>
        <strong>Directed by :</strong> {Director}
      </p>
    </section>   </> }
    </div> )
  }
  // useEffect(function () {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
  //       if (!res.ok) {
  //         throw new Error("there is an error ")
  //       }
  //       const data = await res.json();
  //       setMovies(data.Search);
  //       setIsLoading(false);
  //     }
  //     catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   } fetchData();
  // }, [query]);


  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      {isLoading ? <Loader /> : <Main movies={movies} watched={watched}
       MovieDetails={MovieDetails} selectedId={selectedId} 
        onSelectMovie = {HandleSelectMovie}  onCloseMovie={HandleCloseMovie} 
        HandleCloseMovie={HandleCloseMovie} onAddWatched ={handleAddWatched} onDeleteWatched={handleDeleteMovie} /> }
    </>
  );
}