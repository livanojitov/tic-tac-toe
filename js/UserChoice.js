class UserChoice extends React.Component {

  componentDidUpdate(prevProps, prevState){
    if (this.props.reset){
      this.refs.computer.checked = '';
      this.refs.user.checked = '';
    }
  }

  startGame = (e) => {
    if (e.target.value == "no"){
      this.props.userChoice(1); // Computer starts playing        
    }else{
        this.props.userChoice(2); // User starts playing         
    }
  }

  render() {
    const { disable } = this.props;
    return (
      <div className="choice">

         <span>Start the game?</span>

        <input onChange={this.startGame} 
                disabled = {disable} 
                type="radio" 
                value="yes" 
                id="yes"
                name="gender"
                ref="user"/>
        <label disabled = {disable} className="yes" htmlFor="yes">Yes</label>

        <input onChange={this.startGame}
                disabled = {disable} 
                type="radio"
                value="no" 
                id="no"
                name="gender"
                ref="computer"/>
        <label disabled = {disable} className="no" htmlFor="no">No</label>      

      </div> 
    )  
  }
} 