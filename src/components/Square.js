import React from 'react';

const Square = ({ win, disabled, handleClick, id, player }) => {
  return (
    <button style     = {{ backgroundImage : `url(/images/${player}.jpg)`}}
            className = {win}
            disabled  = {disabled} 
            onClick   = {(e) => { if (handleClick){ handleClick(e)} }}
            id        = {id}>
    </button>
  )
}

export default Square;