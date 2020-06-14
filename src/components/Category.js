import React, { Component}   from 'react';
import { HistoryContext }    from '../contexts/HistoryContext';
import { LanguageContext }   from '../contexts/LanguageContext';
import { DictionaryContext } from '../contexts/DictionaryContext';
import { CategoryContext }   from '../contexts/CategoryContext';

class Category extends Component{

  constructor(props){
    super(props);

    let categoryId = this.props.categoryId;
    if (!categoryId){
      categoryId = 0;
    }

    this.state = {
      categoryId
    }

  }
  
  render(){
    return (
      <CategoryContext.Consumer>{(categoryContext) => (
        <DictionaryContext.Consumer>{(dictionaryContext) => (
          <LanguageContext.Consumer>{(languageContext) => (
            <HistoryContext.Consumer>{(historyContext) => {
              const { categoryId } = this.state;
              const { history } = historyContext;
              const { getLanguage } = languageContext;
              const language = getLanguage();
              const { CATEGORIES } = categoryContext;
              this.categories = CATEGORIES;
              const { DICTIONARY } = dictionaryContext;

              if (DICTIONARY && CATEGORIES){
                let categoryJSX;
                if (!history){  
                  categoryJSX =  (
                    <select value={categoryId} onChange={this.onChange}>
                      {CATEGORIES.map(
                        (category, index) => {
                          return (
                            <option key={index} value={index}>{DICTIONARY[language][category.name]}</option>  
                          )
                        })}
                    </select>);
                }else{
                  categoryJSX = (<span>{DICTIONARY[language][CATEGORIES[categoryId].name]}</span>);
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
      )}</CategoryContext.Consumer> 
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
    if (this.props.onCategoryChange && this.categories){
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
