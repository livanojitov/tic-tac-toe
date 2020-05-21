import React, { Component}   from 'react';
import { HistoryContext }    from '../contexts/HistoryContext';
import { LanguageContext }   from '../contexts/LanguageContext';
import { DictionaryContext } from '../contexts/DictionaryContext';

class Category extends Component{

  constructor(props){
    super(props);

    this.categories = [
      { name: 'HAVANA_LANDMARKS',      folder: "habana"   , count : 20} ,
      { name: 'VANCOUVER_LANDMARKS',   folder: "vancouver", count : 20} ,
      { name: 'SPAIN_LANDMARKS',       folder: "spain"    , count : 20} ,
      { name: 'GERMANY_LANDMARKS',     folder: "germany"  , count : 20} ,      
      { name: 'SOCCER_PLAYERS',        folder: "soccer"   , count : 20} , 
      { name: 'FRUITS_AND_VEGETABLES', folder: "fruits"   , count : 20} ,
      { name: 'ANIMALS',               folder: "animals"  , count : 20} , 
      { name: 'PUPPIES',               folder: "puppies"  , count : 20} ,       
      { name: 'ALPHABET',              folder: "alphabet" , count : 26} ,
      { name: 'SEINFELD',              folder: "seinfeld" , count : 20}
    ];

    let categoryId = this.props.categoryId;
    if (!(typeof(categoryId) != undefined && categoryId >=0 && categoryId < this.categories.length)){
      categoryId = Math.floor(Math.random() * this.categories.length);
    }
 
    this.state = {
      categoryId
    }

  }
  
  render(){
    return (
      <DictionaryContext.Consumer>{(dictionaryContext) => (
        <LanguageContext.Consumer>{(languageContext) => (
          <HistoryContext.Consumer>{(historyContext) => {
            const { categoryId } = this.state;
            const { history } = historyContext;
            const { getLanguage } = languageContext;
          
            let { DICTIONARY } = dictionaryContext;
            if (DICTIONARY){
              const language = getLanguage();
              const name  = DICTIONARY[language][this.categories[categoryId].name];
              let categoryJSX;

              if (!history){  
                categoryJSX =  (
                  <select value={categoryId} onChange={this.onChange}>
                    {this.categories.map(
                      (category, index) => {
                        return (
                          <option key={index} value={index}>{DICTIONARY[language][category.name]}</option>  
                        )
                      })}
                  </select>);
              }else{
                categoryJSX = <span>{name}</span>;
              }

              return (
                <div className = "categories">
                  <span>{DICTIONARY[language].CATEGORY}: </span>
                  {categoryJSX}
                </div>
              )
            }
          }}</HistoryContext.Consumer>
        )}</LanguageContext.Consumer>
      )}</DictionaryContext.Consumer>
      
    )
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.categoryId !== this.state.categoryId){
      this.emitCategory();
    }     
  }

  shouldComponentUpdate(nextProps, nextState){
   return (this.state.categoryId !== nextState.categoryId);
  }

  componentDidMount(){
    this.emitCategory();    
  }

  emitCategory(){
    if (this.props.onCategoryChange){
      const categoryId = this.state.categoryId;
      this.props.onCategoryChange({
        categoryId ,
        ...this.categories[categoryId]
      });
    }
  }

  onChange = (e) => {
    const categoryId = e.target.value;
    this.setState(() => ({categoryId}));
  }


}

export default Category;
