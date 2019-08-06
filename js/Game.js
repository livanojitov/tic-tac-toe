class Game extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      category: {},
      disableBoard: true,
      player: 1,
      reset: false
     };
  }

  render(){
    return(
      <div className="board">
        <Category category="5" onCategoryChange = {this.onCategoryChange}/>
        <UserQuestion disable    = {!this.state.disableBoard} 
                    userQuestion = {this.userQuestion } 
                    reset        = {this.state.reset} 
                    />
        {(this.state.category.imageUser) && (
          <Board category     = {this.state.category} 
                 disableBoard = {this.state.disableBoard}
                 startOver    = {this.startOver}
                 player       = {this.state.player}
                 addToStore  = {this.props.addToStore} />)}
        </div>
    )
  }

  userQuestion = (player) => {
    this.setState(() => ({disableBoard: false, player}));
  }

  onCategoryChange = (category) => {
    this.setState(() => ({category}));
  }

  startOver = () => {
    this.setState(() => ({disableBoard: true, reset: true}));
  }

}