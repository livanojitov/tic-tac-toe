import React, { Component } from 'react';
import Images from './Images';
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

    let imageUser = this.props.imageUser;
    let imageComputer = this.props.imageComputer;
    if (!imageUser){
     imageUser = 0;
     imageComputer = 1;
    }
 
    this.state = {
      categoryId,
      imageUser,
      imageComputer
    }

  }
  
  randomizeImages = (categoryId) => {
    const { categories } = this.context;
    const length = categories[categoryId].count;
    const imageUser = Math.floor(Math.random() * length);
    let imageComputer = Math.floor(Math.random() * length);
    while ( imageUser === imageComputer){
        imageComputer = Math.floor(Math.random() * length);
    }
    return [imageUser, imageComputer]
  }

  randomizeImage = (categoryId, who) => {
    const { categories } = this.context;
    const length = categories[categoryId].count;
    let imageWho, imageOpponent;

    imageOpponent = (who === constants.USER) ? this.state.imageComputer : this.state.imageUser;
    imageWho = Math.floor(Math.random() * length);
    while ( imageWho === imageOpponent){
      imageWho = Math.floor(Math.random() * length);
    }
    return imageWho;
  }
  
  render(){
    const { categories } = this.context;
    const { categoryId, imageUser, imageComputer } = this.state;
    const { folder, name } = categories[categoryId];
    let select, hideRefreshButton;

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
        hideRefreshButton = false;
      }else{
        select = <span>{name}</span>;
        hideRefreshButton = true;
      }

      return (
        <div className = "categories">
          <span>{constants.CATEGORY}: </span>
          {select}
          <Images hideRefreshButton={hideRefreshButton}  imageUser={imageUser} imageComputer={imageComputer} folder={folder} refresh={ this.refresh}/>
        </div>
      )
    }}</HistoryContext.Consumer>
    )
  }

  componentDidUpdate(prevProps, prevState){
    if ((prevState.categoryId !== this.state.categoryId) || 
        (this.state.imageUser !== prevState.imageUser)   || 
        (this.state.imageComputer !== prevState.imageComputer)){
      this.emitCategory();
    }     
  }

  shouldComponentUpdate(nextProps, nextState) {
   return ((this.state.categoryId !== nextState.categoryId) || 
           (this.state.imageUser !== nextState.imageUser)   ||
           (this.state.imageComputer !== nextState.imageComputer));
  }

  componentDidMount(){
    this.emitCategory();    
  }

  emitCategory(){
    if (this.props.onCategoryChange){
      const categoryId = this.state.categoryId;
      this.props.onCategoryChange({
        categoryId,
        imageUser     : this.state.imageUser,
        imageComputer : this.state.imageComputer
      });
    }
  }

  onChange = (e) => {
    const categoryId = e.target.value;
    const [imageUser, imageComputer] = this.randomizeImages(categoryId);
    this.setState(() => ({categoryId, imageUser, imageComputer}));
  }

  refresh = (who) => {
    let imageWho = this.randomizeImage(this.state.categoryId, who);
    if (who === constants.USER){
      this.setState(() => ({imageUser : imageWho}));
    }else {
      this.setState(() => ({imageComputer : imageWho}));
    }  
  }
}

export default Category;
