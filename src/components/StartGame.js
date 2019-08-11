import React from 'react';

class StartGame extends React.Component {

  render() {
    const { disable, whoStarted } = this.props;
  
    const html = (typeof(whoStarted) === 'undefined') ? (
      <div className="question">
        <span>Start?</span>
        <input onChange  = {() => this.setPlayer(2)} 
                disabled = {disable} 
                type     = "radio" 
                value    = "yes"
                name     = "gender" />
        <label disabled = {disable} className="yes" htmlFor="yes">Yes</label>

        <input onChange={() => this.setPlayer(1)}
                disabled = {disable} 
                type     = "radio"
                value    = "no"
                name     = "gender" />
        <label disabled = {disable} className="no" htmlFor="no">No</label>      
      </div>
    ) : (
      <div className="question">
        {whoStarted === 1 ? 'Start? Computer' : 'Start? You'}
      </div>
    );

    return (
      html
    )  
  }

  setPlayer(player){
    if (this.props.onPlayerChange){
      this.props.onPlayerChange(player);
    }
  }  
} 

export default StartGame;