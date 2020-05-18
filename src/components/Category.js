import React, { Component} from 'react';
import { HistoryContext }  from '../contexts/HistoryContext';
import { LanguageContext } from '../contexts/LanguageContext';
import DICTIONARY          from './Dictionary';

class Category extends Component{

  constructor(props){
    super(props);

    this.categories = [
      { folder: "habana"   , count : 20} ,
      { folder: "vancouver", count : 20} , 
      { folder: "soccer"   , count : 20} , 
      { folder: "fruits"   , count : 20} ,
      { folder: "animals"  , count : 20} , 
      { folder: "alphabet" , count : 26} , 
      { folder: "puppies"  , count : 20} , 
      { folder: "seinfeld" , count : 20} ,
      { folder: "spain"    , count : 20} ,
      { folder: "germany"  , count : 20}
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
      <LanguageContext.Consumer>{(languageContext) => (
        <HistoryContext.Consumer>{(historyContext) => {
          const { categoryId } = this.state;
          const { history } = historyContext;
          const { getLanguage } = languageContext;
          const language = getLanguage();
          const name  = DICTIONARY[language].CATEGORIES[categoryId].name;
          let categoryJSX;

          if (!history){  
            categoryJSX =  (
              <select value={categoryId} onChange={this.onChange}>
                {DICTIONARY[language].CATEGORIES.map(
                  (category, index) => {
                    return (
                      <option key={index} value={index}>{category.name}</option>  
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
        }}</HistoryContext.Consumer>
      )}</LanguageContext.Consumer>
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
