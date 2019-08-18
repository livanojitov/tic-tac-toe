import React from 'react';

const Square = ({ win, disableSquare, handleClick, id, player }) => {
  return (
    <button style     = {{ backgroundImage : `url(images/${player}.jpg)`}}
            className = {win}
            disabled  = {disableSquare} 
            onClick   = {(e) => { if (handleClick){ handleClick(e)} }}
            id        = {id}>
    </button>
  )
}

export default Square;