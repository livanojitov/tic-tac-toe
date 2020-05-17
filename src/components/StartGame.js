import React, { Component } from 'react';
import { HistoryContext }   from '../contexts/HistoryContext';
import { LanguageContext }  from '../contexts/LanguageContext';
import { USER, COMPUTER }   from './Dictionary';
import DICTIONARY           from './Dictionary';

class StartGame extends Component {
  static contextType = HistoryContext;
  state = {
    who : USER
  } 

  render() {
    const { history } = this.context;
    const { disabled, first } = this.props;

    return (
      <LanguageContext.Consumer>{(languageContext) => {
        const { getLanguage } = languageContext;
        const language = getLanguage();
        return (!history) ? ( 
                <div className="question">

                  <span title = {DICTIONARY[language].START_TOOLTIP}>{DICTIONARY[language].START}?</span>

                  <input onChange  = {this.setPlayer} 
                          disabled = {disabled} 
                          type     = "radio" 
                          value    = {USER}
                          name     = "player"
                          title    = {DICTIONARY[language].YES_TOOLTIP}
                          checked  = {this.state.who === USER}
                          id       = "yes" />
                  <label  disabled = {disabled} htmlFor = "yes" title = {DICTIONARY[language].YES_TOOLTIP}>{DICTIONARY[language].YES}</label>

                  <input onChange  = {this.setPlayer}
                          disabled = {disabled} 
                          type     = "radio"
                          value    = {COMPUTER}
                          name     = "player"
                          title    = {DICTIONARY[language].NO_TOOLTIP}
                          checked  = {this.state.who === COMPUTER}
                          id       = "no" />
                  <label  disabled = {disabled} htmlFor = "no" title = {DICTIONARY[language].NO_TOOLTIP}>{DICTIONARY[language].NO}</label>   

                </div>
              ) : (
                <div className="question">
                  {DICTIONARY[language].START_HISTORY} {first === COMPUTER ? DICTIONARY[language].OPPONENT : DICTIONARY[language].YOU}
                </div>
              );
      }}</LanguageContext.Consumer>
    )  
  }

  setPlayer = (e) => {
    const who = e.target.value * 1;
    this.setState(() => ({who}));
  }

  onPlayerChange = () => {
    if (this.props.onPlayerChange){
      this.props.onPlayerChange(this.state.who);
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