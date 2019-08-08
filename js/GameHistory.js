const GameHistory = (props) => {
  let board = "";
  const computer = 1;
  const user = 2;
  const { useContext } = React;
  const { getGame, removeGame } = useContext(GameContext);
  let game = {};
  const gameId = props.match.params.id; 
  game = getGame(gameId);
 
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

        <UserQuestion whoStarted = {game.whoStarted}/>

        {board}
        <br/>
      { game && 
        <div className="info">
          {game.message}&nbsp;&nbsp;
          <input type="button" value="Delete" onClick={(e) => { removeGame(gameId); props.history.push('/history')}} className="delete"/>&nbsp;&nbsp;
          <input type="button" value="Back"   onClick={(e) => {props.history.push('/history')}}/>              
        </div>
      } 
    </div>
  )
}