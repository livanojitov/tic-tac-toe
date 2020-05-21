import React, { Component }  from 'react';
import { HistoryContext }    from '../contexts/HistoryContext';
import { LanguageContext }   from '../contexts/LanguageContext';
import { USER, COMPUTER }    from './Constants';
import { DictionaryContext } from '../contexts/DictionaryContext';

class StartGame extends Component {
  static contextType = HistoryContext;
  state = {
    who : USER
  } 

  render() {
    const { history } = this.context;
    const { disabled, first } = this.props;

    return (
      <DictionaryContext.Consumer>{(dictionaryContext) => ( 
        <LanguageContext.Consumer>{(languageContext) => {
          const { getLanguage } = languageContext;
          const language = getLanguage();
          let { DICTIONARY } = dictionaryContext;
          return (!history) ? ( 
                  <div className="question">

                    <span title = {DICTIONARY && DICTIONARY[language].START_TOOLTIP}>{DICTIONARY && DICTIONARY[language].START}?</span>

                    <select className="" onChange={this.setPlayer} disabled = {disabled} >
                      <option key="0"  value={USER}>{DICTIONARY && DICTIONARY[language].YES}</option>  
                      <option key="1"  value={COMPUTER}>{DICTIONARY && DICTIONARY[language].NO}</option>  
                    </select> 

                  </div>
                ) : (
                  <div className="question">
                    {DICTIONARY && DICTIONARY[language].STARTED_BY} {first === COMPUTER ? DICTIONARY && DICTIONARY[language].OPPONENT : DICTIONARY && DICTIONARY[language].STARTED_BY_PLAYER}
                  </div>
                );
        }}</LanguageContext.Consumer>
      )}</DictionaryContext.Consumer> 
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