const { Link, NavLink, Route, Redirect, Switch } = ReactRouterDOM;

class App extends React.Component {      

  constructor(props){
    super(props);
    this.state = {
      games : []
    }
    if (typeof(Storage) !== "undefined") {
      if (localStorage.tictactoe) {
        this.state = {
          games: JSON.parse(localStorage.tictactoe)
        }
      }
    }  
  }

  componentDidUpdate(prevProps, prevState){
    if (typeof(Storage) !== "undefined") {
      const games = this.state.games;
      if (games.length < prevState.games.length){
        if (games.length){
          localStorage.tictactoe = JSON.stringify(games);
        }else{
          localStorage.removeItem('tictactoe');
        } 
      }
      if (games.length > prevState.games.length){
        localStorage.tictactoe = JSON.stringify(games);
      }
    }
  }

  updateStore= (game) =>{
    this.setState(() => ({ games : [...this.state.games,game] }));
  }

  deleteFromStore = (index) => {
    if (index >=0 && index < this.state.games.length && this.state.games.length > 0){
      this.setState(() => ({ games : this.state.games.filter((game, i) => i != index) }));       
    }
  }
  
  render(){
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect;
      console.log("App.js redirect : ", redirect);
      console.log("App.js props : ", props);
      return (
        <Redirect to={redirect}></Redirect>
      )
    }else{
      return (
        <ReactRouterDOM.BrowserRouter basename="/tic-tac-toe">
          <Navigation/>
          <Switch>
            <Route path="/"        exact render={props => <Game updateStore={this.updateStore} {...props} />} />
            <Route path="/history" exact render={props => <History games={this.state.games} {...props} />} />
            <Route path="/about"   exact component={About}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/:id"     exact render={props => 
                      <GameHistory deleteFromStore={this.deleteFromStore} 
                                   game={this.state.games.filter((game, index) => index == props.match.params.id)} {...props}/>} />
          </Switch>
        </ReactRouterDOM.BrowserRouter>
      )
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
