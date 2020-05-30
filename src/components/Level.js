import React,{ Component }    from 'react';
import { HistoryContext  }    from '../contexts/HistoryContext';
import { LanguageContext }    from '../contexts/LanguageContext';
import { EASY, HARD, NORMAL } from './Constants';
import { DictionaryContext }  from '../contexts/DictionaryContext';

class Level extends Component {
  static contextType = HistoryContext;
  state = {
    level : EASY
  }

  render() {
    return (
      <DictionaryContext.Consumer>{(dictionaryContext) => (      
        <LanguageContext.Consumer>{(languageContext) => {
          const { history } = this.context;
          const { disabled, level} = this.props;
          const { getLanguage } = languageContext;
          const language = getLanguage();
          let { DICTIONARY } = dictionaryContext;
          return  (!history) ? ( 
                
            <div className="level">

              <span title = {DICTIONARY && DICTIONARY[language].LEVEL_TOOLTIP}>{DICTIONARY && DICTIONARY[language].LEVEL}?</span>

              <select onChange={this.setLevel} disabled = {disabled} >
                <option key={EASY}   value={EASY}>{DICTIONARY && DICTIONARY[language].LEVEL_EASY}</option>  
                <option key={NORMAL} value={NORMAL}>{DICTIONARY && DICTIONARY[language].LEVEL_NORMAL}</option>  
                <option key={HARD}   value={HARD}>{DICTIONARY && DICTIONARY[language].LEVEL_HARD}</option>  
              </select>

            </div>
          ) : (
            <div className="level">
              {level === EASY ? DICTIONARY && DICTIONARY[language].LEVEL_EASY_HISTORY : ((level === HARD) ? DICTIONARY && DICTIONARY[language].LEVEL_HARD_HISTORY : DICTIONARY && DICTIONARY[language].LEVEL_NORMAL_HISTORY)}
            </div>
          );
        
        }}</LanguageContext.Consumer>
      )}</DictionaryContext.Consumer>      
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