const History = (props) => {
  let boards;
  let deleteBoard=function(ind){
      props.deleteFromStore(ind);
  }

  if (props.boards.length > 0){
    boards = props.boards.map((board, ind) => {    
        return (<BoardHistory 
                  key={ind} 
                  board={board.board}
                  winningSquares={board.winningSquares}
                  message={board.message}
                  imageUser={board.imageUser}
                  imageComputer={board.imageComputer} 
                  ind={ind}
                  deleteBoard={deleteBoard}
                />
          )
    });
  }else{
    boards = (
      <div className="info"> 
        No history yet. Play some games and comeback
      </div>  
    )    
  }  
  return (
    <div className="history">
        {boards}
    </div> 
  )    
}

const BoardHistory = (props) => {
    const computer = 1;
    const user = 2;
    let board;

    board = props.board.map((square, ind) => {
      return (
          <button 
              key={ind} 
              style={{ backgroundImage : "url(images/" + (square == computer ? props.imageComputer : ( square == user ? props.imageUser : 'field')) +".jpg)"}}
              title={(square == computer ? props.imageComputer : ( square == user ? props.imageUser : ''))}
              disabled = {true}
              className = {props.winningSquares.indexOf(ind) != -1 ? 'win' : ''}
          >    
          </button>
        )
    });
    return (
      <div>
          {board}
          <br/>   
          <div className="info">{props.message}</div>
          <input className="delete" type="button" onClick={(e)=>{props.deleteBoard(props.ind)}} value="Delete"/>
          <hr/>
      </div> 
    )

}