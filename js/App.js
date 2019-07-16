const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route;
      
const App = props => (
  <ReactRouterDOM.HashRouter>
    <Navigation/>
    <Route path="/" exact component={Board} />
    <Route path="/about" component={About} />
  </ReactRouterDOM.HashRouter>
)

ReactDOM.render(<App />, document.getElementById('app'));
