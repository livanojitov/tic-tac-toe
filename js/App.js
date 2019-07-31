const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route,
      Redirect = ReactRouterDOM.Redirect;

class App extends React.Component {      
  state = {
    boards : []
  }

  updateStore= (board) =>{
    this.setState(() => ({ boards : [...this.state.boards,board] }));
  }

  deleteFromStore = (ind) => {
    this.setState(() => ({ boards : this.state.boards.filter((board, i) => i !== ind)})); 
  }
  
  render(){
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
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