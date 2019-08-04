class UserQuestion extends React.Component {

  componentDidUpdate(prevProps, prevState){
    if (this.props.reset && !this.props.disable){
      this.refs.computer.checked = '';
      this.refs.user.checked = '';
    }
  }

  render() {
    const { disable } = this.props;
    return (
      <div className="question">

         <span>Start the game?</span>

        <input onChange  = {() => this.props.userQuestion(2)} 
                disabled = {disable} 
                type     = "radio" 
                value    = "yes" 
                id       = "yes"
                name     = "gender"
                ref      = "user"/>
        <label disabled = {disable} className="yes" htmlFor="yes">Yes</label>

        <input onChange={() => this.props.userQuestion(1)}
                disabled = {disable} 
                type     = "radio"
                value    = "no" 
                id       = "no"
                name     = "gender"
                ref      = "computer"/>
        <label disabled = {disable} className="no" htmlFor="no">No</label>      

      </div> 
    )  
  }
} 