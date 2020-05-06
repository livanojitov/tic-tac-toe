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

        <span title = "How easy or hard the computer plays.">Level?</span>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio" 
                value    = {constants.easy} 
                name     = "level"
                title    = "The computer plays randomly." 
                checked  = {this.state.level === constants.easy}
                id       = "easy" />
        <label  disabled = {disabled} htmlFor = "easy" title = "The computer plays randomly." >Easy</label>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio"
                value    = {constants.hard}
                name     = "level"
                title    = "The computer does some thinking before playing."
                checked  = {this.state.level === constants.hard}
                id       = "hard" />
        <label  disabled = {disabled} htmlFor = "hard" title = "The computer does some thinking before playing.">Hard</label>  

      </div>
    ) : (
      <div className="level">
        {level === 1 ? 'Level: Easy' : 'Level: Hard'}
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