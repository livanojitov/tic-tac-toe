class Game extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      category: {},
      disableBoard: true,
      who: 1,
      reset: false
     };
  }

  render(){
    return(
      <div className="board">
        <Category category="0" onCategoryChange = {this.onCategoryChange}/>
        <UserQuestion disable    = {!this.state.disableBoard} 
                    userQuestion = {this.userQuestion } 
                    reset        = {this.state.reset} 
                    />
        {(this.state.category.imageUser) && (
          <Board category     = {this.state.category} 
                 disableBoard = {this.state.disableBoard}
                 startOver    = {this.startOver}
                 who          = {this.state.who}
                 updateStore  = {this.props.updateStore} />)}
        </div>
    )
  }

  userQuestion = (who) => {
    this.setState(() => ({disableBoard: false, who}));
  }

  onCategoryChange = (category) => {
    this.setState(() => ({category}));
  }

  startOver = () => {
    this.setState(() => ({disableBoard: true, reset: true}));
  }

}