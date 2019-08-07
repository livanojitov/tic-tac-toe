const { Link, NavLink, Route, Redirect, Switch, withRouter } = ReactRouterDOM;

class App extends React.Component {      
  
  render(){
    console.log('props : ', this.props);
      return (
        <GameContextProvider>
          <ReactRouterDOM.BrowserRouter basename="/tic-tac-toe">
            <Navigation/>
            <Switch>
              <Route path="/"        exact component={Game}        />
              <Route path="/history" exact component={History}     /> 
              <Route path="/about"   exact component={About}       />
              <Route path="/contact" exact component={Contact}     />
              <Route path="/:id"     exact component={GameHistory} /> 
            </Switch>
          </ReactRouterDOM.BrowserRouter>
        </GameContextProvider>
      )
  }
}

ReactDOM.render(withRouter(App), document.getElementById('app'));
