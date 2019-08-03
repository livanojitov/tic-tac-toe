class Square extends React.Component{

  render(){
    const { win, disableSquare, handleClick, id, player } = this.props;

    return (
      <button style={{ backgroundImage : "url(images/" + player +".jpg)"}}
              className = {win}
              disabled  = {disableSquare} 
              onClick   = {(e) => { if (handleClick){ handleClick(e)} }}
              id        = {id}>
      </button>
    )
  }
}