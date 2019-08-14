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
        <span>Start?</span>
        <input onChange  = {this.setPlayer} 
                disabled = {disable} 
                type     = "radio" 
                value    = "2"
                name     = "player"
                checked  = { this.state.who === "2"}/>
        <label disabled = {disable} htmlFor="yes">Yes</label>

        <input onChange={this.setPlayer}
                disabled = {disable} 
                type     = "radio"
                value    = "1"
                name     = "player"
                checked  = { this.state.who === "1"}/>
        <label disabled = {disable} htmlFor="no">No</label>      
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