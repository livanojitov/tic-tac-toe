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

    this.state = {
      category: this.props.category? this.props.category:0   
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
      this.imageUser = this.props.imageUser;
      this.imageComputer = this.props.imageComputer;
    }else{
      const images = this.randomizeImages();
      this.imageUser = images[0];
      this.imageComputer = images[1]; 
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
          <p>
            You are :    <img title={this.imageUser}     src={`./images/${folder}/${this.imageUser}.jpg`}/>
            &nbsp;&nbsp;&nbsp; 
            Computer is: <img title={this.imageComputer} src={`./images/${folder}/${this.imageComputer}.jpg`}/>
          </p>
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
      const category = this.categories[categoryId];
      this.props.onCategoryChange({
        category      : categoryId,
        name          : category.name,
        folder        : category.folder,
        count         : category.count,
        imageUser     : this.imageUser,
        imageComputer : this.imageComputer
      });
    }
  }

  componentDidMount(){
    const category = this.props.category;
    if (category && category != this.state.category && category < this.categories.length && category >= 0){
      this.setState(() => ({ category }));
    }else{ 
      this.emitCategory();    
    }
  }

}
