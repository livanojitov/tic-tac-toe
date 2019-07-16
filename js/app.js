const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route;

const Navigation = () => {
  return (
    <div className="nav">
      <img src="./images/tic-tac-toe.png"/>
      <ul>
        <li><NavLink exact to="/about">About</NavLink></li>           
        <li><NavLink exact to="/">Home</NavLink></li>
      </ul>
    </div>
  )
}

const App = props => (
  <ReactRouterDOM.HashRouter>
    <Navigation/>
    <Route path="/" exact component={Board} />
    <Route path="/about" component={About} />
  </ReactRouterDOM.HashRouter>
)

const About = () => {
  return (
    <div className="info">
        <p>The Tic-Tac-Toe game written in React.js</p>
        <p>
          <label>Author : </label>Livan Ojito Villanueva
        </p>
        <p>
           <label>Source Code : </label><br/>
           <a href="https://github.com/livanojitov/tic-tac-toe">https://github.com/livanojitov/tic-tac-toe</a>
        </p>
        <p>
          <label>LinkedIn: </label><br/>
          <a href="https://ca.linkedin.com/in/livan-ojito-villanueva">https://ca.linkedin.com/in/livan-ojito-villanueva</a>
        </p>
    </div>
  )
}

class UserChoice extends React.Component {

  componentDidUpdate(prevProps, prevState){
    if (this.props.reset){
      this.refs.computer.checked = '';
      this.refs.user.checked = '';
    }
  }

  startGame = (e) => {
      if (e.target.value == "no"){
        this.props.userChoice(1); // 1 - Computer starts playing        
      }else{
          this.props.userChoice(2); // 2 - User starts playing         
      }
  }

  render() {
    return (
      <div className="choice">
        <label>You are     <img width="30" height="30" title="Cristiano Ronaldo" src="./images/ronaldo.jpg"/></label>, 
        <label>Computer is <img width="30" height="30" title="Lionel Messi"      src="./images/messi.jpg"/></label><br/><br/>
        <input onChange={this.startGame} 
                disabled = {!this.props.disable} 
                type="radio" 
                value="yes" 
                name="gender"
                ref="user"/>Yes
        <input onChange={this.startGame}
                disabled = {!this.props.disable} 
                type="radio"
                value="no" 
                name="gender"
                ref="computer"/>No
      </div> 
    )  
  }
} 

const Info = (props) => {
  return (
    <div className="msg">  
        <label>{props.message}</label>
        <br/>
        <br/>
        <input type="button" value="Start Over" onClick={props.startOver} />
    </div>
  )
}

class Board extends React.Component {
    nobody = 0
    computer = 1
    user = 2

    state = {
        board : [this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody, this.nobody],
        winningSquares : [],
        gameOver : false,
        message  : '',
        disableBoard : true       
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
            disableBoard : true
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
                    player={ square == this.computer ? 'messi' : ( square == this.user ? 'ronaldo' : 'field')} 
                    win = { this.state.gameOver ? (this.state.winningSquares.indexOf(ind) != -1 ? 'win' : '') : ''}
                    disableSquare = {this.state.disableBoard ? true : (this.state.gameOver ? true : (square != this.nobody ? true : false)) }
                    handleClick = {this.handleClick}
                    id={ind}
                  />
          ) 
      });
      return(
        <div className="board">
          <UserChoice disable = {this.state.disableBoard} userChoice = {this.userChoice } reset={this.state.gameOver} />
          {board}
          {this.state.gameOver && ( <Info message = {this.state.message} startOver = {this.startOver}/>)}  
        </div>
      )
    }

    handleClick = (e) => {
      this.play(this.user,e.target.id);
      if (this.hasUserWon()){
        this.animateBoard();
        this.setState( () => {
          return {
            gameOver : true,
            message  : "Game over : You won!"
          }
        });
        return;
      }

      if (this.isBoardFull()){
        this.setState( () => {
            return {
              gameOver : true,
              message  : "Game over : It's a Tie!"
            }
        });
      }else{
        let winnerSquare = this.isAboutToWin(this.computer);
        if (winnerSquare != -1){
            this.play(this.computer, winnerSquare);
            this.animateBoard();
            this.setState( () => {
                return {
                  gameOver : true,
                  message  : "Game over : You lost!"
                }
            });
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
          this.setState(() => {
            return {
              gameOver : true,
              message  : "Game over : It's a Tie!"
            }
          });
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
        <button className = {[props.player, props.win].join(" ")}
                disabled  = {props.disableSquare} 
                onClick   = {props.handleClick }
                id        = {props.id}>
        </button>
      )
  }

  ReactDOM.render(<App />, document.getElementById('app'));
