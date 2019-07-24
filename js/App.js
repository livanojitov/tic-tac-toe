const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route;

class App extends React.Component {      
  state = {
    boards : []
  }

  updateStore= (board) =>{
    this.setState(() => {
        return {
          boards : [...this.state.boards,board]
        }
    });
  }

  deleteFromStore = (ind) => {
    this.setState(() => {
      return {
        boards : this.state.boards.filter((board, i) => i !== ind)
      } 
    });     
  }
  
  render(){
    return (
      <ReactRouterDOM.HashRouter>
        <Navigation/>
        <Route path="/"        exact render={props => <TicTacToe updateStore={this.updateStore} {...props} />} />
        <Route path="/history" exact render={props => <History deleteFromStore={this.deleteFromStore} boards={this.state.boards} {...props} />} />
        <Route path="/about"   exact component={About}/>
        <Route path="/contact" exact component={Contact}/>
      </ReactRouterDOM.HashRouter>
  )}
}

ReactDOM.render(<App/>, document.getElementById('app'));