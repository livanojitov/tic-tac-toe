import React, { Component } from 'react';
import Images from './Images';
import { CategoryContext }   from '../contexts/CategoryContext';
import * as constants from './Constants';

class Category extends Component{ 
  static contextType = CategoryContext;

  constructor(props){
    super(props);

    let categoryId = this.props.categoryId;
    if (!(typeof(categoryId) != undefined && categoryId >=0 && categoryId < 8)){ // this.categories.length
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

  render(){
    const { categories } = this.context;
    const { history } = this.props;
    const { categoryId, imageUser, imageComputer } = this.state;
    const { folder, name } = categories[categoryId];
    let select, hideRefreshButton;

    if (typeof(history) === 'undefined' || history === "false"){
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
        {constants.category}: &nbsp;
        {select}
        <Images hideRefreshButton={hideRefreshButton}  imageUser={imageUser} imageComputer={imageComputer} folder={folder} refresh={ this.refresh}/>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState){
    if ((prevState.categoryId !== this.state.categoryId) || (this.state.imageUser !== prevState.imageUser)){
      this.emitCategory();
    }     
  }

  shouldComponentUpdate(nextProps, nextState) {
   return ((this.state.categoryId !== nextState.categoryId) || (this.state.imageUser !== nextState.imageUser));
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

  refresh = () => {
    const [imageUser, imageComputer] = this.randomizeImages(this.state.categoryId);
    this.setState(() => ({imageUser, imageComputer}));
  }
}

export default Category;
