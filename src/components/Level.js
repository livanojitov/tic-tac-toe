import React,{ Component } from 'react';
import * as constants from './Constants';

class Level extends Component {

  state = {
    level : constants.easy
  }

  render() {

    const { disabled, level, history } = this.props;

    const html = (typeof(history) === 'undefined'  || history === "false") ? ( 
           
      <div className="level">

        <span title = {constants.levelTooltip}>{constants.level}?</span>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio" 
                value    = {constants.easy} 
                name     = "level"
                title    = {constants.computerPlaysEasyTooltip} 
                checked  = {this.state.level === constants.easy}
                id       = "easy" />
        <label  disabled = {disabled} htmlFor = "easy" title = {constants.computerPlaysEasyTooltip} >{constants.computerPlaysEasy} </label>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio"
                value    = {constants.hard}
                name     = "level"
                title    = {constants.computerPlaysHardTooltip}
                checked  = {this.state.level === constants.hard}
                id       = "hard" />
        <label  disabled = {disabled} htmlFor = "hard" title = {constants.computerPlaysHardTooltip}>{constants.computerPlaysHard}</label>  

      </div>
    ) : (
      <div className="level">
        {level === constants.easy ? constants.levelHistoryEasy : constants.levelHistoryHard}
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