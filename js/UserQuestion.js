class UserQuestion extends React.Component {

  componentDidUpdate(prevProps, prevState){
    if (this.props.reset && !this.props.disable){
      this.refs.computer.checked = '';
      this.refs.user.checked = '';
    }
  }

  render() {
    const { disable, whoStarted } = this.props;
  
    const html = ((typeof(whoStarted) == 'undefined') || whoStarted == "false") ? (
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
  ) : (
    <div className="question">
     {whoStarted == 1 ? 'The computer started to play.' : 'You started to play.'}
    </div>
  );

    return (
      html
    )  
  }
} 