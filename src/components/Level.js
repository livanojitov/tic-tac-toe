import React from 'react';

class Level extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      level : "1"
    }   
  }

  render() {

    const { disable, level } = this.props;
  
    const html = (typeof(level) === 'undefined') ? (
      <div className="level">
        <span>Level?</span>
        <input  onChange = {this.setLevel}
                disabled = {disable} 
                type     = "radio" 
                value    = "1" 
                name     = "level" 
                checked  = { this.state.level === "1"}/>
        <label  disabled = {disable}  htmlFor="easy">Easy</label>

        <input  onChange = {this.setLevel}
                disabled = {disable} 
                type     = "radio"
                value    = "2" 
                name     = "level"
                checked  = { this.state.level === "2"}/>
        <label  disabled = {disable} htmlFor="hard">Hard</label>      
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