const Info = (props) => {
  return (
    <div className="msg">  
        <label>{props.message}</label>
        <br/>
        <br/>
        <input type="button" value="Start Over" onClick={props.startOver} />
    </div>
  )
}
