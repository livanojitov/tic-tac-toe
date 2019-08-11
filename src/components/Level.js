import React from 'react';

class Level extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      level : "2"
    }   
  }

  render() {

    const { level } = this.props;
  
    const html = (typeof(level) === 'undefined') ? (
      <div className="level">
        <span>Level?</span>
        <input  onChange  = {this.setLevel}
                type     = "radio" 
                value    = "1" 
                name     = "level" 
                checked  = { this.state.level === "1"}/>
        <label htmlFor="easy">Easy</label>

        <input  onChange={this.setLevel}
                type     = "radio"
                value    = "2" 
                name     = "level"
                checked  = { this.state.level === "2"}/>
        <label htmlFor="hard">Hard</label>      
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
    const value = e.target.value;
    this.setState(() => ({level : value}));
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.level !== this.state.level){
      if (this.props.setLevel){
        this.props.setLevel(this.state.level * 1);
      }     
    }     
  }

  componentDidMount(){
    if (this.props.setLevel){
      this.props.setLevel(this.state.level * 1);
    }
  }  
} 

export default Level;