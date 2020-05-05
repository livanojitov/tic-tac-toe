import React, { Component } from 'react';
import Images from './Images';

class Category extends Component{ 

  constructor(props){
    super(props);
    this.categories = [
      { name: "La Habana"          , folder: "habana"   , count : 20} ,
      { name: "Vancouver landmarks", folder: "vancouver", count : 20} , 
      { name: "Soccer players"     , folder: "soccer"   , count : 20} , 
      { name: "Fruits & Vegetables", folder: "fruits"   , count : 20} ,
      { name: "Animals"            , folder: "animals"  , count : 20} , 
      { name: "Alphabet"           , folder: "alphabet" , count : 26} , 
      { name: "Puppies"            , folder: "puppies"  , count : 20} , 
      { name: "Seinfeld"           , folder: "seinfeld" , count : 20}
    ];

    let categoryId = this.props.categoryId;
    if (!(typeof(categoryId) != undefined && categoryId >=0 && categoryId < this.categories.length)){
      categoryId = Math.floor(Math.random() * this.categories.length);
    }

    let imageUser = this.props.imageUser;
    let imageComputer = this.props.imageComputer;
    if (!imageUser){
      [imageUser, imageComputer] = this.randomizeImages(categoryId);
    }
 
    this.state = {
      categoryId,
      imageUser,
      imageComputer
    }

  }
  
  randomizeImages = (categoryId) => {
    const length = this.categories[categoryId].count;
    const imageUser = Math.floor(Math.random() * length);
    let imageComputer = Math.floor(Math.random() * length);
    while ( imageUser === imageComputer){
        imageComputer = Math.floor(Math.random() * length);
    }
    return [imageUser, imageComputer]
  }

  render(){
    const { history } = this.props;
    const { categoryId, imageUser, imageComputer } = this.state;
    const { folder, name } = this.categories[categoryId];
    let select, hideRefreshButton;

    if (typeof(history) === 'undefined' || history === "false"){
      select =  (
        <select value={categoryId} onChange={this.onChange}>
          {this.categories.map(
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
        Category: &nbsp;
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
        ...this.categories[categoryId],
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
