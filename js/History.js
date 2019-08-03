const History = (props) => {
  let games;
  let deleteBoard=function(ind){
      props.deleteFromStore(ind);
  }

  if (props.games.length > 0){
    games = props.games.map((board, ind) => {    
        return (<GamesHistory 
                  key={ind} 
                  board={board.board}
                  winningSquares={board.winningSquares}
                  message={board.message}
                  imageUser={board.imageUser}
                  imageComputer={board.imageComputer} 
                  folder={board.folder}
                  category={board.category}
                  ind={ind}
                  deleteBoard={deleteBoard}
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