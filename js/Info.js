const Info = (props) => {
  return (
    <div className="info">  
        <span>Game over : {props.message}</span>&nbsp;&nbsp;
        <input type="button" value="Start Over" onClick={props.startOver} />
    </div>
  )
}