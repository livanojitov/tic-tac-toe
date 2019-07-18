class Board extends React.Component {
    nobody = 0
    computer = 1
    user = 2
    imageCounter = 6

    state = {
        board : [this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody],
        winningSquares : [],
        gameOver : false,
        message  : '',
        disableBoard : true,
        image : Math.floor(Math.random() * this.imageCounter)
    }
    
    computerPlay(){
      this.play(this.computer, Math.floor(Math.random() * this.state.board.length))
    }
    
    startOver = () => {
      let newBoard =  this.state.board;
      newBoard.fill(this.nobody);
      this.setState(() => {
          return {
            board : newBoard,
            winningSquares : [],
            gameOver : false,
            disableBoard : true,
            image : Math.floor(Math.random() * this.imageCounter)
          }
      }); 
    }

    userChoice = (player) => {
      this.setState(() => {
          return {
            disableBoard : false
          }
      });      
      if (player == this.computer){
        this.computerPlay()
      }
    }
    
    render(){
      const board = this.state.board.map((square, ind) => {
          return (<Square 
                    key={ind} 
                    player={ square == this.computer ? 'messi' + this.state.image : ( square == this.user ? 'ronaldo' + this.state.image : 'field')} 
                    win = { this.state.gameOver ? (this.state.winningSquares.indexOf(ind) != -1 ? 'win' : '') : ''}
                    disableSquare = {this.state.disableBoard ? true : (this.state.gameOver ? true : (square != this.nobody ? true : false)) }
                    handleClick = {this.handleClick}
                    id={ind}
                  />
          ) 
      });
      return(
        <div className="board">
          <UserChoice disable = {!this.state.disableBoard} userChoice = {this.userChoice } reset={this.state.gameOver} image={this.state.image}/>
          {board}
          {this.state.gameOver && ( <Info message = {this.state.message} startOver = {this.startOver}/>)} 
        </div>
      )
    }

    gameOver = (message) => {
      this.setState( () => {
        return {
          gameOver : true,
          message : message
        }
      });
      this.props.displayHistory({ image: this.state.image, board : [...this.state.board], message: message});
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
      let newBoard = this.state.board;
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
          this.setState(() => {
            return {
              winningSquares : [square1, square2, square3]
            }
          });
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

  const Square = (props) => {
      return (
        <button style={{ backgroundImage : "url(images/" + props.player +".jpg)"}}
                className = {[props.win].join(" ")}
                disabled  = {props.disableSquare} 
                onClick   = {props.handleClick }
                id        = {props.id}>
        </button>
      )
  }
