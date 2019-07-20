const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route;

class App extends React.Component {      
    state = {
      newBoard : []
    }

    updateStore= (oldBoard) =>{  
      const newBoard1 = [...this.state.newBoard,oldBoard];
      this.setState(() => {
         return {
           newBoard : newBoard1
         }
      });
    }
  
    deleteFromStore = (ind) => {
      const newBoard = this.state.newBoard.filter((board, i) => i !== ind);
      this.setState(() => {
        return {
         newBoard
        } 
      });     
    }
    
    render(){
      return (
        <ReactRouterDOM.HashRouter>
          <Navigation/>
          <Route path="/"        exact render={props => <Board updateStore={this.updateStore} {...props} />} />
          <Route path="/history" exact render={props => <History deleteFromStore={this.deleteFromStore} boards={this.state.newBoard} {...props} />} />
          <Route path="/about"   exact component={About}/>
          <Route path="/contact" exact component={Contact}/>
        </ReactRouterDOM.HashRouter>
    )}
}

ReactDOM.render(<App/>, document.getElementById('app'));
