import React,{ Component }    from 'react';
import { HistoryContext  }    from '../contexts/HistoryContext';
import { LanguageContext }    from '../contexts/LanguageContext';
import { EASY, HARD, NORMAL } from './Dictionary';
import DICTIONARY             from './Dictionary';

class Level extends Component {
  static contextType = HistoryContext;
  state = {
    level : EASY
  }

  render() {
    return (
      <LanguageContext.Consumer>{(languageContext) => {
        const { history } = this.context;
        const { disabled, level} = this.props;
        const { getLanguage } = languageContext;
        const language = getLanguage();
        return  (!history) ? ( 
              
          <div className="level">

            <span title = {DICTIONARY[language].LEVEL_TOOLTIP}>{DICTIONARY[language].LEVEL}?</span>

            <select onChange={this.setLevel} disabled = {disabled} >
              <option key={EASY}   value={EASY}>{DICTIONARY[language].LEVEL_EASY}</option>  
              <option key={HARD}   value={HARD}>{DICTIONARY[language].LEVEL_HARD}</option>  
              <option key={NORMAL} value={NORMAL}>{DICTIONARY[language].LEVEL_NORMAL}</option>  
            </select>

          </div>
        ) : (
          <div className="level">
            {level === EASY ? DICTIONARY[language].LEVEL_EASY_HISTORY : ((level === HARD) ? DICTIONARY[language].LEVEL_HARD_HISTORY : DICTIONARY[language].LEVEL_NORMAL_HISTORY)}
          </div>
        );
      
      }}</LanguageContext.Consumer>
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