import React,{ Component } from 'react';
import { HistoryContext }   from '../contexts/HistoryContext';
import * as constants from './Constants';

const { LEVEL, LEVEL_TOOLTIP, EASY, HARD, NORMAL, COMPUTER_PLAYS_EASY, COMPUTER_PLAYS_HARD, COMPUTER_PLAYS_NORMAL, LEVEL_HISTORY_EASY, LEVEL_HISTORY_HARD, LEVEL_HISTORY_NORMAL} = constants;

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

        <select className="levels" onChange={this.setLevel} disabled = {disabled} >
          <option key={EASY}   value={EASY}>{COMPUTER_PLAYS_EASY}</option>  
          <option key={HARD}   value={HARD}>{COMPUTER_PLAYS_HARD}</option>  
          <option key={NORMAL} value={NORMAL}>{COMPUTER_PLAYS_NORMAL}</option>  
        </select>

      </div>
    ) : (
      <div className="level">
        {level === EASY ? LEVEL_HISTORY_EASY : ((level === HARD) ? LEVEL_HISTORY_HARD : LEVEL_HISTORY_NORMAL)}
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