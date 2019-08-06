class Board extends React.Component {
  nobody = 0
  computer = 1
  user = 2
  static contextType = GameContext

  constructor(props){
    super(props);
    this.category = this.props.category;
    this.disableBoard = this.props.disableBoard;
    this.state = {
        board : Array(9).fill(this.nobody),
        winningSquares : [],
        gameOver : false,
        message  : ''
    };
  }

  render(){
    const { winningSquares, gameOver, message } = this.state;

    if (this.props.category.folder != this.category.folder){
      if (!gameOver){
        this.category = this.props.category;
      }
    }

    if (this.props.disableBoard != this.disableBoard){
      this.disableBoard = this.props.disableBoard;
    }

    const { folder, imageComputer, imageUser } = this.category;

    const board = this.state.board.map((square, ind) => {
      const player = (square == this.computer)? `${folder}/${imageComputer}` : (
                     (square == this.user)?     `${folder}/${imageUser}`     : 'default'); 
      const win = gameOver ? (winningSquares.indexOf(ind) != -1 ? 'win' : '') : '';
      const disableSquare = this.disableBoard ? true : (gameOver ? true : (square != this.nobody ? true : false));
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disableSquare = {disableSquare}
                handleClick   = {this.handleClick}
                id            = {ind}
              />
      ) 
    });  
    
    return (
      <div>
        {board}
        {gameOver && ( <Info message = {message} startOver = {this.startOver}/>)} 
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState){   
    if (this.isBoardEmpty() && (this.props.player == this.computer) && !this.disableBoard){
      this.computerPlay();
    }
  }

  computerPlay(){
    this.play(this.computer, Math.floor(Math.random() * this.state.board.length))
  }
  
  startOver = () => {
    this.category = this.props.category;   
    const newBoard =  this.state.board;
    newBoard.fill(this.nobody);
    this.setState(() => {
        return {
          board : newBoard,
          winningSquares : [],
          gameOver : false,
          message  : ''              
        }
    });
    this.props.startOver();
  }
  
  gameOver = (message) => {
    const { board, winningSquares } = this.state;
    this.setState( () => ({ gameOver : true, message : message }));
    const { addGame } = this.context;
    addGame({
      board : [...board],
      winningSquares : [...winningSquares],
      message: message,
      ...this.category
    });
  }

  handleClick = (e) => {
    this.play(this.user,e.target.id);
    if (this.hasUserWon()){
      this.animateBoard();
      this.gameOver("You won!");
      return;
    }

    if (this.isBoardFull()){
      this.gameOver("It's a draw!");
    }else{
      let winnerSquare = this.isAboutToWin(this.computer);
      if (winnerSquare != -1){
        this.play(this.computer, winnerSquare);
        this.animateBoard();
        this.gameOver("You lost!");
        return;
      }

      winnerSquare = this.isAboutToWin(this.user);
      if (winnerSquare != -1){
        this.play(this.computer, winnerSquare);
      }else{
        for (let i=0; i< this.state.board.length; i++){
          if (this.state.board[i] == this.nobody){
            this.play(this.computer, i);
            break;
          }
        }
      }

      if (this.isBoardFull()){
        this.gameOver("It's a draw!");
      }
    }  
  }

  play(player, square){
    const newBoard = this.state.board;
    newBoard[square] = player;
    this.setState(() => {
      return {
        board : newBoard
      }
    });
  }
  
  check(player, square1, square2, square3){
    const board = this.state.board;
    if (board[square1] == player && board[square2] == player && board[square3] == this.nobody){
      return square3;
    } 
    if (board[square1] == player && board[square2] == this.nobody && board[square3] == player){
      return square2;
    }
    if (board[square1] == this.nobody && board[square2] == player && board[square3] == player){
      return square1;
    } 
    return -1;       
  }

  isAboutToWin(player){
    // first row;
    let square;
    square = this.check(player, 0, 1, 2);
    if (square != -1){
      return square;
    }
    // second row
    square = this.check(player, 3, 4, 5);
    if (square != -1){
      return square;
    }
    // third row;
    square = this.check(player, 6, 7, 8);
    if (square != -1){
      return square;
    }
    // first column;
    square = this.check(player, 0, 3, 6);
    if (square != -1){
      return square;
    }
    // second column
    square = this.check(player, 1, 4, 7);
    if (square != -1){
      return square;
    }
    // third column;
    square = this.check(player, 2, 5, 8);
    if (square != -1){
      return square;
    }
    // first diagonal;
    square = this.check(player, 0, 4, 8);
    if (square != -1){
      return square;
    }
    // second diagonal;
    square = this.check(player, 2, 4, 6);
    if (square != -1){
      return square;
    }
    
    return -1;
  }

  isBoardFull = () => {
    return !this.state.board.includes(0);
  }

  isBoardEmpty = () => {
    return (!(this.state.board.includes(this.computer) || this.state.board.includes(this.user)));
  }

  hasUserWon(){
    const board = this.state.board;
    const user  = this.user;
    return (
      (board[0] == user && board[1] == user && board[2] == user) || 
      (board[3] == user && board[4] == user && board[5] == user) || 
      (board[6] == user && board[7] == user && board[8] == user) || 
      (board[0] == user && board[3] == user && board[6] == user) || 
      (board[1] == user && board[4] == user && board[7] == user) || 
      (board[2] == user && board[5] == user && board[8] == user) || 
      (board[0] == user && board[4] == user && board[8] == user) || 
      (board[2] == user && board[4] == user && board[6] == user)
    )
  }

  animateSquares(square1, square2, square3){
    const board = this.state.board;
    
    if ((board[square1] != this.nobody) && (board[square1] == board[square2]) && (board[square2] == board[square3])){
        const ws = this.state.winningSquares;
        [ws[0], ws[1], ws[2]] = [square1, square2, square3];
        this.setState(() => ({ winningSquares : ws }));
    }
  }

  animateBoard(){
    this.animateSquares(0,1,2);
    this.animateSquares(3,4,5);
    this.animateSquares(6,7,8);
    this.animateSquares(0,3,6);
    this.animateSquares(1,4,7);
    this.animateSquares(2,5,8);
    this.animateSquares(0,4,8);
    this.animateSquares(2,4,6);
  }
}  