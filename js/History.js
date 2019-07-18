const History = (props) => {
    let boards;
    let deleteBoard=function(ind){
        props.deleteHistory(ind);
    }

    if (props.boards.length > 0){
        boards = props.boards.map((board, ind) => {    
            return (<BoardHistory 
                        key={ind} 
                        board={board.board}
                        imagen={board.image} 
                        message={board.message}
                        ind={ind}
                        deleteBoard={deleteBoard}
                    />
              )
        });
    }else{
        boards = (
            <div className="info"> 
              No history yet. Play some games.
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
            <button key={ind} style={{ backgroundImage : "url(images/" + (square == computer ? 'messi' + props.imagen : ( square == user ? 'ronaldo' + props.imagen : 'field')) +".jpg)"}}
                    disabled = {true}> 
            </button>
          )
    });
    return (
        <div>
            {board}
            <br/>   
            <div className="info"> 
                {props.message}
            </div>
            <input className="delete" type="button" onClick={(e)=>{props.deleteBoard(props.ind)}} value="Delete"/>
            <hr/>
        </div> 
    )

}
