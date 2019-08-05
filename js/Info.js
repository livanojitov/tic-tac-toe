const Info = (props) => {
  return (
    <div className="info">  
        <span>Game over : {props.message}</span>&nbsp;&nbsp;
        <input type="button" value="Play again" onClick={props.startOver} />
    </div>
  )
}