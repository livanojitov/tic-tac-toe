import React     from 'react';
import Category  from './Category';
import StartGame from './StartGame';
import Board     from './Board';
import Level     from './Level';

class Game extends React.Component {
 
  constructor(props){
    super(props);
    this.player = -1;
    this.level  = -1;
    this.state = {
      category: {},
      disableBoard: true,
      reset: false
     };
  }

  render(){
    return(
      <div className="game">
        <Category setCategory = {this.setCategory}/>  
        <div className="questions">
          <StartGame setPlayer = {this.setPlayer } />
          <Level setLevel = {this.setLevel} />
        </div>
        {(this.state.category.imageUser) && (
          <Board category     = {this.state.category} 
                 disableBoard = {this.state.disableBoard}
                 getPlayer    = {this.getPlayer}
                 getLevel     = {this.getLevel} />)}
        </div>
    )
  }

  setCategory = (category) => {
    this.setState(() => ({category}));
  }

  getCategory = () => {
    return this.state.category;
  }

  setPlayer = (player) => {
    this.player = player;
    this.setState(() => ({disableBoard: false}));
  }

  getPlayer = () => {
    return this.player;
  }

  setLevel = (level) => {
    this.level = level;
  }

  getLevel = () => {
    return this.level;
  }

}

export default Game