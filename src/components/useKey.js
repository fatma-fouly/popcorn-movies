import { useEffect } from "react";



export function useKey(key, action) {
     useEffect(function(){  // close the movie section when enter esc button 
           function callback(e){
           if (e.key.toLowerCase() === key.toLowerCase()) {
             action();
          } }
           
           document.addEventListener("keydown" , callback)
    
          return function(){
            document.removeEventListener('keydown', callback )
          }
      }, [action, key])
 }
