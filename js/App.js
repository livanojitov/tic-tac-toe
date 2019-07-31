const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route,
      Redirect = ReactRouterDOM.Redirect;

class App extends React.Component {      

  constructor(props){
    super(props);
    this.state = {
      boards : []
    }
    if (typeof(Storage) !== "undefined") {
      if (localStorage.history) {
        this.state = {
          boards: JSON.parse(localStorage.history)
        }
      }
    }  
  }

  componentDidUpdate(prevProps, prevState){
    if (typeof(Storage) !== "undefined") {
      let boards = this.state.boards;
      if (boards.length < prevState.boards.length){
        if (boards.length){
          localStorage.history = JSON.stringify(boards);
        }else{
          localStorage.removeItem('history');
        } 
      }
      if (boards.length > prevState.boards.length){
        localStorage.history = JSON.stringify(boards);
      }
    }
  }

  updateStore= (board) =>{
    this.setState(() => ({ boards : [...this.state.boards,board] }));
  }

  deleteFromStore = (ind) => {
    if (ind >=0 && ind < this.state.boards.length && this.state.boards.length > 0){
      this.setState(() => ({ boards : this.state.boards.filter((board, i) => i !== ind) }));       
    }
  }
  
  render(){
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect;
      console.log('redirect');
      return (
        <Redirect to={redirect}></Redirect>
      )
    }else{
      return (
        <ReactRouterDOM.BrowserRouter basename="/tic-tac-toe">
          <Navigation/>
          <Route path="/"        exact render={props => <TicTacToe updateStore={this.updateStore} {...props} />} />
          <Route path="/history" exact render={props => <History deleteFromStore={this.deleteFromStore} boards={this.state.boards} {...props} />} />
          <Route path="/about"   exact component={About}/>
          <Route path="/contact" exact component={Contact}/>
        </ReactRouterDOM.BrowserRouter>
      )
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));