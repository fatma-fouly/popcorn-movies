import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import StarRating from "./components/StarRating";

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
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  

  function  HandleSelectMovie(id) {
    setSelectedId(selectedId=> id=== selectedId ? null  : id )
  }

  function HandleCloseMovie() {
    setSelectedId(null)
    }
     
  function handleAddWatched(movie){
    setWatched(watched  => [...watched, movie]);
  }
  function MovieDetails({selectedId, onCloseMovie , onAddWatched , watched}) {
    const [isLoading , setIsLoading] = useState(false);
     const [movie , setMovie] = useState({});
     const [userRating , setUserRating] = useState('');
     const isWatched = watched?.map((movie) => movie.ImdbID);
     console.log(isWatched);
      
     const {Title,Plot, Poster, Runtime, imdbRating, Rated , Released , Actors, Director, Genre , Year } = movie

    function addMovie(){
     const  newWatchedList ={
      ImdbID: selectedId,
      Title,
      Poster,
      Year,
      Runtime: Number(Runtime.split(" ")[0]),
      ImdbRating: Number(imdbRating),
      userRating,
     }   
     onAddWatched(newWatchedList);
     onCloseMovie();
    }
    useEffect(function(){
      async function getMovieDetils(){
        setIsLoading(true); 
       const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
       const data  = await res.json();
        console.log(data);
       setMovie(data);
       setIsLoading(false);
      }
      getMovieDetils();
    } , [selectedId])

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
        <StarRating maxRating={10} size={24} onRating={setUserRating} />
        {userRating > 0 && ( <button className="btn-add"  onClick={addMovie}> + Add To Watched </button>) }
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
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if (!res.ok) {
          throw new Error("there is an error ")
        }
        const data = await res.json();
        setMovies(data.Search);
        console.log(data.Search)
        setIsLoading(false);
      }
      catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } fetchData();
  }, [query]);


  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      {isLoading ? <Loader /> : <Main movies={movies} watched={watched}
       MovieDetails={MovieDetails} selectedId={selectedId} 
        onSelectMovie = {HandleSelectMovie}  onCloseMovie={HandleCloseMovie} 
        HandleCloseMovie={HandleCloseMovie} onAddWatched ={handleAddWatched}/>}
    </>
  );
}