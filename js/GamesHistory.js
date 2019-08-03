const GamesHistory = (props) => {
  return (
    <div className="games-history">
      <Category 
        category      = {props.category} 
        imageUser     = {props.imageUser} 
        imageComputer = {props.imageComputer}
        disable       = "true" /> 

      <div className="info">
        {props.message}
        <br/>
        <Link to={'/' + props.ind}>See Board</Link>
      </div>
      <hr/>
    </div>           
  );
}
