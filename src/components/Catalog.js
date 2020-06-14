import React, { Component }  from 'react';
import Category              from './Category';
import { DictionaryContext } from '../contexts/DictionaryContext';
import { CategoryContext }   from '../contexts/CategoryContext';

class Catalog extends Component {

  constructor(props){
    super(props);


    this.state = {
      categoryId : -1,
      count : 0,
      folder : '',
      name: ''
     };
  }
  
  render(){
    return (
     <CategoryContext.Consumer>{(categoryContext) => ( 
      <DictionaryContext.Consumer>{(dictionaryContext) => {
        const { DICTIONARY } = dictionaryContext;
        const { CATEGORIES } = categoryContext;
        return (
          <div>
          { DICTIONARY && CATEGORIES &&  ( 
            <div className="catalog">
              <Category onCategoryChange = {this.setCategory}/> 
              <div className="catalog-images"> 
              {Array(~~this.state.count).fill(1).map(
                  (value, index) => {
                    return (
                      <div key={index}>
                        <img src={`images/${this.state.folder}/${index}.jpg`} alt="user"/>
                      </div>  
                    )
                  })}
              </div>
            </div>  )}
          </div> )
      }}</DictionaryContext.Consumer>
     )}</CategoryContext.Consumer>      
    )
  }   
  
  setCategory = (category) => {
    this.setState(() => (category));
  }
}  

export default Catalog;