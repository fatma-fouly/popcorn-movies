import { useState } from "react";

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};


export default function StarRating({ maxRating = 5,
   color = '#fcc419',
   size = 24 ,
   messages = [] ,
   defaultState = 0,
    onRating,
  })
   {
    const numberStyle = {
    fontSize: `${size}px`,
    color,
  }
  const [rating, setRating] = useState(defaultState);
  const [tempRating, settempRating] = useState(0);

  return (
    <div style={containerStyle} >
      <div  > {Array.from({ length: maxRating }, (_, i) => (
        <Star key={i}
          onRate={() => { setRating(i + 1)  
             onRating(i+1)  } }
          full={tempRating ? tempRating >= i + 1 :
            rating >= i + 1}
          onHover={() => { settempRating(i + 1) }}
          onLeave={() => settempRating(0)}
          size={size}
          color={color} />
      ))}
      </div>
      <div style={numberStyle} > { messages.length === maxRating
      ? messages[tempRating ? tempRating -1 : rating - 1]
      : tempRating || rating || "" } </div>
    </div>
  )
}

function Star({ onRate, full, onLeave, onHover, size, color }) {

  const starStyle = {
    width: `${size}px`,
    color,
    cursor: "pointer"
  }
  return (
    <span onClick={onRate} onMouseEnter={onHover} onMouseLeave={onLeave} >
      <svg style={starStyle}
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={full ? `${color}` : "none"}
        stroke={`${color}`}
        strokeWidth={2}
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>

    </span >
  )
}
