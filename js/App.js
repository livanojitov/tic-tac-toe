const Link = ReactRouterDOM.Link, 
      NavLink = ReactRouterDOM.NavLink, 
      Route = ReactRouterDOM.Route;

class App extends React.Component {      
    state = {
      newBoard : []
    }

    updateHistory = (oldBoard) =>{  
      const newBoard1 = [...this.state.newBoard,oldBoard];
      this.setState(() => {
         return {
           newBoard : newBoard1
         }
      });
    }
  
    deleteHistory = (ind) => {
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
          <Route path="/"        exact render={props => <Board displayHistory={this.updateHistory} {...props} />} />
          <Route path="/history" exact render={props => <History deleteHistory={this.deleteHistory} boards={this.state.newBoard} {...props} />} />
          <Route path="/about"   exact component={About}/>
        </ReactRouterDOM.HashRouter>
    )}
}

ReactDOM.render(<App/>, document.getElementById('app'));
