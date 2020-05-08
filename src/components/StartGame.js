import React, { Component } from 'react';
import { HistoryContext }   from '../contexts/HistoryContext';
import * as constants from './Constants';

const { USER, START_TOOLTIP, START, YES_TOOLTIP, YES, COMPUTER, NO_TOOLTIP, NO, GAME_STARTED_BY, OPPONENT, YOU } = constants;

class StartGame extends Component {
  static contextType = HistoryContext;
  state = {
    who : USER
  } 

  render() {
    const { history } = this.context;
    const { disabled, first } = this.props;
    const html = (!history) ? (

      <div className="question">

        <span title = {START_TOOLTIP}>{START}?</span>

        <input onChange  = {this.setPlayer} 
                disabled = {disabled} 
                type     = "radio" 
                value    = {USER}
                name     = "player"
                title    = {YES_TOOLTIP}
                checked  = {this.state.who === USER}
                id       = "yes" />
        <label  disabled = {disabled} htmlFor = "yes" title = {YES_TOOLTIP}>{YES}</label>

        <input onChange  = {this.setPlayer}
                disabled = {disabled} 
                type     = "radio"
                value    = {COMPUTER}
                name     = "player"
                title    = {NO_TOOLTIP}
                checked  = {this.state.who === COMPUTER}
                id       = "no" />
        <label  disabled = {disabled} htmlFor = "no" title = {NO_TOOLTIP}>{NO}</label>   

      </div>
    ) : (
      <div className="question">
        {GAME_STARTED_BY} {first === COMPUTER ? OPPONENT : YOU}
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