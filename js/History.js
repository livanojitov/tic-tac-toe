const History = (props) => {
  let games = '';

  if (props.games.length > 0){
    games = props.games.map((game, ind) => {    
        return (<GamesHistory 
                  key            = {ind} 
                  message        = {game.message}
                  imageUser      = {game.imageUser}
                  imageComputer  = {game.imageComputer} 
                  category       = {game.category}
                  ind            = {ind}
                />
          )
    });
  }else{
    games = (
      <div className="info"> 
        No history yet. Play some games and comeback
      </div>  
    )    
  }  
  return (
    <div className="history">
        {games}
    </div> 
  )    
}