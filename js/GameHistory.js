const GameHistory = (props) => {
  let game = "";
  let board = "";
  const gameId = props.match.params.id;
  const computer = 1;
  const user = 2;

  if (props.games){
    for (let i=0; i< props.games.length; i++){
      if (i == gameId){
        game = props.games[i];
        break;
      }
    }
  }
  
  if (game){
    const pathImgComputer = `${game.folder}/${game.imageComputer}`;
    const pathImgUser = `${game.folder}/${game.imageUser}`;
    board = game.board.map((square, ind) => {
      let player = (square == computer) ? pathImgComputer : ( (square == user) ? pathImgUser : 'default'); 
      let win = game.winningSquares.indexOf(ind) != -1 ? 'win' : '';
      let disableSquare = true;
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disableSquare = {disableSquare}
                id            = {ind}
              />
      ) 
    });
  }else{
    board = '';
  }

  return (
    <div className="game-history">
      <Category 
          category      = {game.category} 
          imageUser     = {game.imageUser} 
          imageComputer = {game.imageComputer}
          disable       = "true" /> 
      {board}
      <br/>
      <div className="info">
        {game.message}
        <br/>
        <input className="delete" type="button" value="Delete" onClick={(e) => { props.deleteFromStore(gameId); props.history.push('/history')}} />
        <input type="button" value="Back" onClick={(e) => {props.history.push('/history')}}/>              
      </div>
    </div>
  )
}