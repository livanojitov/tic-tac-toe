const GamesHistory = (props) => {
  let {category, imageUser, imageComputer, message, ind} = props;
  return (
    <div className="games-history">
      <Category 
        category      = {category} 
        imageUser     = {imageUser} 
        imageComputer = {imageComputer}
        disable       = "true" /> 

      <div className="info">
        {message}&nbsp;&nbsp;<Link to={`/${ind}`}>See Board</Link>
      </div>
      <hr/>
    </div>           
  );
}
