import React, { Component } from 'react';
import * as constants from './Constants';

class StartGame extends Component {

  state = {
    who : constants.user
  } 

  render() {
    const { disabled, first, history } = this.props;
    const html = (typeof(history) === 'undefined'  || history === "false") ? (

      <div className="question">

        <span title = {constants.startTooltip}>{constants.start}?</span>

        <input onChange  = {this.setPlayer} 
                disabled = {disabled} 
                type     = "radio" 
                value    = {constants.user}
                name     = "player"
                title    = {constants.yesTooltip}
                checked  = {this.state.who === constants.user}
                id       = "yes" />
        <label  disabled = {disabled} htmlFor = "yes" title = {constants.yesTooltip}>{constants.yes}</label>

        <input onChange  = {this.setPlayer}
                disabled = {disabled} 
                type     = "radio"
                value    = {constants.computer}
                name     = "player"
                title    = {constants.noTooltip}
                checked  = {this.state.who === constants.computer}
                id       = "no" />
        <label  disabled = {disabled} htmlFor = "no" title = {constants.noTooltip}>{constants.no}</label>   

      </div>
    ) : (
      <div className="question">
        {constants.gameStartedBy} {first === constants.computer ? constants.opponent : constants.you}
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