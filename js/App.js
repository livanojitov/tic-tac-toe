const { Link, NavLink, Route, Redirect, Switch } = ReactRouterDOM;
const { useState } = React;

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

  addToStore= (game) =>{
    this.setState(() => ({ games : [...this.state.games,game] }));
  }

  deleteFromStore = (index) => {
    if (index >=0 && index < this.state.games.length && this.state.games.length > 0){
      this.setState(() => ({ games : this.state.games.filter((game, i) => i != index) }));       
    }
  }
  
  getFromStore = (index) => {
    if (index >=0 && index < this.state.games.length && this.state.games.length > 0){
      return this.state.games.filter((game, i) => index == i);
    }else{
      return [];
    }
  }

  render(){
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect;
      if (redirect == "/" || redirect == "/history" || redirect == "/about" || redirect == "/contact" || !isNaN(redirect) ){
        return (
          <Redirect to={redirect}></Redirect>
         ) 
      }else{
        return (
          <Redirect to="/"></Redirect>
        ) 
      }      
    }else{
      const arr = location.pathname.split("/");
      if (arr.length > 1 && (arr[2] == "index" || arr[2] == "index.html")){
        return (
         <Redirect to="/"></Redirect>
        )  
      }else{
        return (
          <ReactRouterDOM.BrowserRouter basename="/tic-tac-toe">
            <Navigation/>
            <Switch>
              <Route path="/"        exact render={props => <Game addToStore={this.addToStore} {...props} />} />
              <Route path="/history" exact render={props => <History games={this.state.games} {...props} />} />
              <Route path="/about"   exact component={About}/>
              <Route path="/contact" exact component={Contact}/>
              <Route path="/:id"     exact render={props => <GameHistory deleteFromStore={this.deleteFromStore} game={ this.getFromStore(props.match.params.id)} {...props}/>} />
            </Switch>
          </ReactRouterDOM.BrowserRouter>
        )
      }
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
