import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { useState } from "react";
import StarRating from './components/StarRating.jsx' ;
import App from './App.jsx';

function  Test () {
  const [movieRate , setMovieRate] =  useState (0) ;

return <> 
<StarRating  color='blue' maxRating={5} size={50} onRating={setMovieRate}  /> 
<p>that movie has a {movieRate}   star</p>
</>

}
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App  />
    {/* <StarRating  messages = {["terrible" , "bad", "okay" , "good", "amazing"] }/>
    <StarRating maxRating={10} color='red' messages = {["terrible" , "bad", "okay" , "good", "amazing"]} defaultState={3} />
    <Test /> */}
  </StrictMode>,
)
