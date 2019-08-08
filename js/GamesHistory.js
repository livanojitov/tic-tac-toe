const GamesHistory = (props) => {
  let {category, imageUser, imageComputer, message, id, whoStarted} = props;
  return (
    <div className="games-history">

      <Category 
        category      = {category} 
        imageUser     = {imageUser} 
        imageComputer = {imageComputer}
        disable       = "true" /> 

      <UserQuestion whoStarted = {whoStarted}/>

      <div className="info">
        {message}&nbsp;&nbsp;<Link to={`/${id}`}>See Game</Link>
      </div>

      <hr/>

    </div>           
  );
}
