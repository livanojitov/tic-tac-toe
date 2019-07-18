const Info = (props) => {
  return (
    <div className="info">  
        <p>Game over : {props.message}</p>
        <input type="button" value="Start Over" onClick={props.startOver} />
    </div>
  )
}
