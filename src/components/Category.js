import React, { Component } from 'react';
import { CategoryContext }   from '../contexts/CategoryContext';
import { HistoryContext }   from '../contexts/HistoryContext';
import * as constants from './Constants';

class Category extends Component{ 
  static contextType = CategoryContext;

  constructor(props){
    super(props);

    let categoryId = this.props.categoryId;
    if (!(typeof(categoryId) != undefined && categoryId >=0 && categoryId < 8)){
      categoryId = Math.floor(Math.random() * 8);
    }
 
    this.state = {
      categoryId
    }

  }
  
  render(){
    const { categories } = this.context;
    const { categoryId } = this.state;
    const { name } = categories[categoryId];
    let select;

    return (
      <HistoryContext.Consumer>{(historyContext) => {
      const { history } = historyContext;
      if (!history){  
        select =  (
          <select value={categoryId} onChange={this.onChange}>
            {categories.map(
              (category, index) => {
                return (
                  <option key={index} value={index}>{category.name}</option>  
                )
              })}
          </select>);
      }else{
        select = <span>{name}</span>;
      }

      return (
        <div className = "categories">
          <span>{constants.CATEGORY}: </span>
          {select}
        </div>
      )
    }}</HistoryContext.Consumer>
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
        categoryId
      });
    }
  }

  onChange = (e) => {
    const categoryId = e.target.value;
    this.setState(() => ({categoryId}));
  }


}

export default Category;
