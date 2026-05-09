import { useEffect, useState } from "react";

export function useLocalStorage(key , initialvalue){
     const [value, setValue] = useState(function(){
        const storedWatched = localStorage.getItem(key);
        return storedWatched? JSON.parse(storedWatched) : initialvalue;
      });

      return[value , setValue]
}