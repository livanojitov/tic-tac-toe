const History = () => {
  const { useContext } = React;
  const { games } = useContext(GameContext);
  let historyGames;

  if (games && games.length > 0){
    historyGames = games.map((game) => {  
      return (<GamesHistory 
                key            = {game.id} 
                message        = {game.message}
                imageUser      = {game.imageUser}
                imageComputer  = {game.imageComputer} 
                category       = {game.category}
                id             = {game.id}
              />
        )
    });
  }else{
    historyGames = (
      <div className="info"> 
        No history yet. Play some games and comeback
      </div>  
    )    
  }  
  return (
    <div className="history">
        {historyGames}
    </div> 
  )    
}