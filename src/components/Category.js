import React from 'react';

class Category extends React.Component{

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

    this.imageUser = null;
    this.imageComputer = null;

    let categoryId = this.props.categoryId;
    if (!(categoryId && categoryId >=0 && categoryId < this.categories.length)){
      categoryId = Math.floor(Math.random() * this.categories.length);
    }
    this.state = {
      categoryId
    }
  }
  
  randomizeImages(){
    const length = this.categories[this.state.categoryId].count;
    const imageUser = Math.floor(Math.random() * length);
    let imageComputer = Math.floor(Math.random() * length);
    while ( imageUser === imageComputer){
        imageComputer = Math.floor(Math.random() * length);
    }
    return [imageUser, imageComputer]
  }

  render(){
    const categoryId = this.state.categoryId;
    const folder = this.categories[categoryId].folder;
    const options = this.categories.map((category, index) => {
      return (
        <option key={index} value={index}>{category.name}</option>  
      )
    });

    if (this.props.imageUser){
      ({imageUser: this.imageUser, imageComputer: this.imageComputer} = this.props);
    }else{
      [this.imageUser, this.imageComputer] = this.randomizeImages();
    }

    const select = ((typeof(this.props.disable) === 'undefined') || this.props.disable === "false") ? (
          <select value={categoryId} onChange={this.onChange}>
            {options}
          </select>     
          ) : (
            <span>{this.categories[categoryId].name}</span>
          );

    return (
      <div className = "categories">
        Category: &nbsp;
        {select}
        <div className="random-images">
          You are :    <img title={this.imageUser}     src={`./images/${folder}/${this.imageUser}.jpg`}     alt="user"/>
          &nbsp;&nbsp;&nbsp; 
          Computer is: <img title={this.imageComputer} src={`./images/${folder}/${this.imageComputer}.jpg`} alt="computer"/>  
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.categoryId !== this.state.categoryId){
      this.emitCategory();
    }     
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.categoryId !== nextState.categoryId)
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
        imageUser     : this.imageUser,
        imageComputer : this.imageComputer
      });
    }
  }

  onChange = (e) => {
    const categoryId = e.target.value;
    this.setState(() => ({ categoryId }));
  }
    
}

export default Category;
