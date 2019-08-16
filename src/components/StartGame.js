import React from 'react';

class StartGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      who : "2"
    }   
  }

  render() {
    const { disable, whoStarted } = this.props;
  
    const html = (typeof(whoStarted) === 'undefined') ? (
      <div className="question">
        <span title = "Who starts playing the game: You or the computer?">Start?</span>
        <input onChange  = {this.setPlayer} 
                disabled = {disable} 
                type     = "radio" 
                value    = "2"
                name     = "player"
                title    = "You start playing the game."
                checked  = { this.state.who === "2"}/>
        <label disabled = {disable} htmlFor = "yes" title = "You start playing the game.">Yes</label>

        <input onChange={this.setPlayer}
                disabled = {disable} 
                type     = "radio"
                value    = "1"
                name     = "player"
                title    = "The computer starts playing the game."
                checked  = { this.state.who === "1"}/>
        <label disabled = {disable} htmlFor = "no" title = "The computer starts playing the game.">No</label>      
      </div>
    ) : (
      <div className="question">
        Game started by: {whoStarted === 1 ? 'Computer' : 'You'}
      </div>
    );

    return (
      html
    )  
  }

  setPlayer = (e) => {
    const who = e.target.value;
    this.setState(() => ({who}));
  }

  onPlayerChange = () => {
    if (this.props.onPlayerChange){
      this.props.onPlayerChange(this.state.who * 1);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.who !== this.state.who){
      this.onPlayerChange();
    }     
  }

  componentDidMount(){
    this.onPlayerChange();
  }   
} 

export default StartGame;