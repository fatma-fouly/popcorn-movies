import { useState , useEffect } from "react";


export function useMovies(query){
const KEY = '7c0905a0'
 const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
     useEffect(function () {
        async function fetchData() {
          try {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
            if (!res.ok) {
              throw new Error("there is an error ")
            }
            const data = await res.json();
            setMovies(data.Search);
            setIsLoading(false);
          }
          catch (error) {
            setError(error.message);
            setIsLoading(false);
          }
        } fetchData();
      }, [query]);
     
      return {movies, isLoading, error};
}