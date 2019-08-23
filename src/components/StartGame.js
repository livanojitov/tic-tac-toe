import React from 'react';
import * as constants from './Constants';

class StartGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      who : constants.user
    }   
  }

  render() {
    const { disabled, first, history } = this.props;
    const html = (typeof(history) === 'undefined'  || history === "false") ? (

      <div className="question">

        <span title = "Who starts playing the game: You or the computer?">Start?</span>

        <input onChange  = {this.setPlayer} 
                disabled = {disabled} 
                type     = "radio" 
                value    = {constants.user}
                name     = "player"
                title    = "You start playing the game."
                checked  = { this.state.who === constants.user}/>
        <label  disabled = {disabled} htmlFor = "yes" title = "You start playing the game.">Yes</label>

        <input onChange  = {this.setPlayer}
                disabled = {disabled} 
                type     = "radio"
                value    = {constants.computer}
                name     = "player"
                title    = "The computer starts playing the game."
                checked  = { this.state.who === constants.computer}/>
        <label  disabled = {disabled} htmlFor = "no" title = "The computer starts playing the game.">No</label>   

      </div>
    ) : (
      <div className="question">
        Game started by: {first === constants.computer ? 'Computer' : 'You'}
      </div>
    );

    return (
      html
    )  
  }

  setPlayer = (e) => {
    const who = e.target.value * 1;
    this.setState(() => ({who}));
  }

  onPlayerChange = () => {
    if (this.props.onPlayerChange){
      this.props.onPlayerChange(this.state.who);
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