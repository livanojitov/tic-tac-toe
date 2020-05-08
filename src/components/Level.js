import React,{ Component } from 'react';
import { HistoryContext }   from '../contexts/HistoryContext';
import * as constants from './Constants';

const { EASY, LEVEL_TOOLTIP, LEVEL, COMPUTER_PLAYS_EASY_TOOLTIP, COMPUTER_PLAYS_EASY, HARD, COMPUTER_PLAYS_HARD_TOOLTIP, COMPUTER_PLAYS_HARD,  LEVEL_HISTORY_EASY, LEVEL_HISTORY_HARD} = constants;

class Level extends Component {
  static contextType = HistoryContext;
  state = {
    level : EASY
  }

  render() {
    const { history } = this.context;
    const { disabled, level} = this.props;

    const html = (!history) ? ( 
           
      <div className="level">

        <span title = {LEVEL_TOOLTIP}>{LEVEL}?</span>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio" 
                value    = {EASY} 
                name     = "level"
                title    = {COMPUTER_PLAYS_EASY_TOOLTIP} 
                checked  = {this.state.level === EASY}
                id       = "easy" />
        <label  disabled = {disabled} htmlFor = "easy" title = {COMPUTER_PLAYS_EASY_TOOLTIP} >{COMPUTER_PLAYS_EASY} </label>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio"
                value    = {HARD}
                name     = "level"
                title    = {COMPUTER_PLAYS_HARD_TOOLTIP}
                checked  = {this.state.level === HARD}
                id       = "hard" />
        <label  disabled = {disabled} htmlFor = "hard" title = {COMPUTER_PLAYS_HARD_TOOLTIP}>{COMPUTER_PLAYS_HARD}</label>  

      </div>
    ) : (
      <div className="level">
        {level === EASY ? LEVEL_HISTORY_EASY : LEVEL_HISTORY_HARD}
      </div>
    );

    return (
      html
    )  
  }

  setLevel = (e) => {
    const level = e.target.value * 1;
    this.setState(() => ({level}));
  }

  onLevelChange = () => {
    if (this.props.onLevelChange){
      this.props.onLevelChange(this.state.level);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.level !== this.state.level){
      this.onLevelChange();
    }     
  }

  componentDidMount(){
    this.onLevelChange();
  }  
} 

export default Level;