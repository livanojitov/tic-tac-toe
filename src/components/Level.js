import React from 'react';

class Level extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      level : "1"
    }   
  }

  render() {

    const { disabled, level } = this.props;
  
    const html = (typeof(level) === 'undefined') ? (
      <div className="level">
        <span title = "How easy or hard the computer plays.">Level?</span>
        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio" 
                value    = "1" 
                name     = "level"
                title    = "The computer plays randomly." 
                checked  = { this.state.level === "1"}/>
        <label  disabled = {disabled} htmlFor = "easy" title = "The computer plays randomly." >Easy</label>

        <input  onChange = {this.setLevel}
                disabled = {disabled} 
                type     = "radio"
                value    = "2" 
                name     = "level"
                title    = "The computer does some thinking before playing."
                checked  = { this.state.level === "2"}/>
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
    const level = e.target.value;
    this.setState(() => ({level}));
  }

  onLevelChange = () => {
    if (this.props.onLevelChange){
      this.props.onLevelChange(this.state.level * 1);
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