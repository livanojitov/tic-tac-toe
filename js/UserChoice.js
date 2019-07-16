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
        <label>You are     <img width="30" height="30" title="Cristiano Ronaldo" src="./images/ronaldo0.jpg"/></label>, 
        <label>Computer is <img width="30" height="30" title="Lionel Messi"      src="./images/messi0.jpg"/></label><br/><br/>

        <label>Do you want to start the game?</label>
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
