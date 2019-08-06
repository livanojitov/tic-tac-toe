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

    let category = this.props.category;
    if (!(category && category >=0 && category < this.categories.length)){
      category = Math.floor(Math.random() * this.categories.length);
    }
    this.state = {
      category
    }
  }
  
  randomizeImages(){
    const length = this.categories[this.state.category].count;
    const imageUser = Math.floor(Math.random() * length);
    let imageComputer = Math.floor(Math.random() * length);
    while ( imageUser == imageComputer){
        imageComputer = Math.floor(Math.random() * length);
    }
    return [imageUser, imageComputer]
  }

  render(){
    const category = this.state.category;
    const folder = this.categories[category].folder;
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

    const select = ((typeof(this.props.disable) == 'undefined') || this.props.disable == "false") ? (
          <select value={category} onChange={this.onChange}>
            {options}
          </select>     
          ) : (
            <span>{this.categories[category].name}</span>
          );

    return (
      <div className = "categories">
        Category: &nbsp;
        {select}
        <div className="random-images">
          You are :    <img title={this.imageUser}     src={`./images/${folder}/${this.imageUser}.jpg`}/>
          &nbsp;&nbsp;&nbsp; 
          Computer is: <img title={this.imageComputer} src={`./images/${folder}/${this.imageComputer}.jpg`}/>  
        </div>
      </div>
    )
  }

  onChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.category != this.state.category){
      this.emitCategory();
    }     
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.category != nextState.category)
  }

  emitCategory(){
    if (this.props.onCategoryChange){
      const categoryId = this.state.category;
      this.props.onCategoryChange({
        category      : categoryId,
        ...this.categories[categoryId],
        imageUser     : this.imageUser,
        imageComputer : this.imageComputer
      });
    }
  }

  componentDidMount(){
    this.emitCategory();    
  }

}
