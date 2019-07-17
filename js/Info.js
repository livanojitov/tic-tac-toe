const Info = (props) => {
  return (
    <div className="info">  
        <p>{props.message}</p>
        <input type="button" value="Start Over" onClick={props.startOver} />
    </div>
  )
}
