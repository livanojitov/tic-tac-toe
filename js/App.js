const { Link, NavLink, Route, Redirect, Switch } = ReactRouterDOM;

class App extends React.Component {      

  render(){
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect;
      return (
        <Redirect to={redirect}></Redirect>
       ) 
    }else{
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
}

ReactDOM.render(<App/>, document.getElementById('app'));