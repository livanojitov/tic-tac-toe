import React     from 'react';
import Category  from './Category';
import StartGame from './StartGame';
import Board     from './Board';

class Game extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      category: {},
      disableBoard: true,
      player: 1,
      reset: false
     };
  }

  render(){
    return(
      <div className="game">

        <Category onCategoryChange = {this.onCategoryChange}/>

        <StartGame whoStart = {this.whoStart }  />
                      
        {(this.state.category.imageUser) && (
          <Board category     = {this.state.category} 
                 disableBoard = {this.state.disableBoard}
                 getPlayer    = {this.getPlayer} />)}
                
      </div>
    )
  }

  whoStart = (player) => {
    this.setState(() => ({disableBoard: false, player}));
  }

  onCategoryChange = (category) => {
    this.setState(() => ({category}));
  }

  getCategory = () => {
    return this.state.category;
  }

  getPlayer = () => {
    return this.state.player;
  }

}

export default Game