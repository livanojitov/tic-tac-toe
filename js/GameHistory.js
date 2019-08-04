const GameHistory = (props) => {
  let game = "";
  let board = "";
  const gameId = props.match.params.id;
  const computer = 1;
  const user = 2;

  game = props.game[0];

  if (game){
    const pathImgComputer = `${game.folder}/${game.imageComputer}`;
    const pathImgUser     = `${game.folder}/${game.imageUser}`;
    board = game.board.map((square, ind) => {
      let player = (square == computer) ? pathImgComputer : ( (square == user) ? pathImgUser : 'default'); 
      let win = game.winningSquares.indexOf(ind) != -1 ? 'win' : '';
 
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disableSquare = {true}
                id            = {ind}
              />
      ) 
    });
  }else{
    board = '';
  }

  return (
    <div className="game-history">
      { game && 
        <Category 
            category      = {game.category} 
            imageUser     = {game.imageUser} 
            imageComputer = {game.imageComputer}
            disable       = "true" /> }  
        {board}
        <br/>
      { game && 
        <div className="info">
          {game.message}
          <br/>
          <input type="button" value="Delete" onClick={(e) => { props.deleteFromStore(gameId); props.history.push('/history')}} className="delete"/>
          <input type="button" value="Back"   onClick={(e) => {props.history.push('/history')}}/>              
        </div>
      } 
    </div>
  )
}