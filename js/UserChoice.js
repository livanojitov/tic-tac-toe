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
        <p>You: <img width="30" height="30" title="Cristiano Ronaldo" src="./images/ronaldo0.jpg"/> vs 
           Computer: <img width="30" height="30" title="Lionel Messi" src="./images/messi0.jpg"/></p>

        <span>Do you want to start the game?</span>
        <input onChange={this.startGame} 
                disabled = {this.props.disable} 
                type="radio" 
                value="yes" 
                name="gender"
                ref="user"/>Yes
        <input onChange={this.startGame}
                disabled = {this.props.disable} 
                type="radio"
                value="no" 
                name="gender"
                ref="computer"/>No
      </div> 
    )  
  }
} 
